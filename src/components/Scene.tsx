import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import { mouseStore } from '../lib/mouseStore'

// ─────────────────────────────────────────────────────────
// Knowledge Graph — nodes + edges in 3D space
// ─────────────────────────────────────────────────────────

type NodeData = {
  position: THREE.Vector3
  velocity: THREE.Vector3
  phase: number  // unique time offset for organic movement
}

// Generate a network of nodes with edges based on proximity
function generateGraph(count: number, spread: number) {
  const nodes: NodeData[] = []

  for (let i = 0; i < count; i++) {
    // Distribute with slight clustering tendency toward center
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = spread * (0.3 + Math.random() * 0.7)

    nodes.push({
      position: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi) * 0.5 // Flatten a bit on Z for readable depth
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.0004,
        (Math.random() - 0.5) * 0.0004,
        (Math.random() - 0.5) * 0.0002
      ),
      phase: Math.random() * Math.PI * 2,
    })
  }

  // Build edge list: connect pairs within proximity threshold
  const edges: [number, number][] = []
  const maxEdgeDist = spread * 0.55
  const maxEdgesPerNode = 4

  const edgeCount = new Array(count).fill(0)

  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (edgeCount[i] >= maxEdgesPerNode || edgeCount[j] >= maxEdgesPerNode) continue
      const dist = nodes[i].position.distanceTo(nodes[j].position)
      if (dist < maxEdgeDist) {
        edges.push([i, j])
        edgeCount[i]++
        edgeCount[j]++
      }
    }
  }

  return { nodes, edges }
}

// ─────────────────────────────────────────────────────────
// Graph Renderer Component
// ─────────────────────────────────────────────────────────
function KnowledgeGraph({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodeGeosRef = useRef<THREE.Mesh[]>([])
  const edgesRef = useRef<THREE.LineSegments>(null)
  const cursorNodeRef = useRef<THREE.Mesh>(null)
  const cursorEdgesRef = useRef<THREE.LineSegments>(null)

  const { camera, size } = useThree()

  // Generate graph data (memo'd so it doesn't change on re-renders)
  const INITIAL_COUNT = 28
  const FULL_COUNT = 48

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateGraph(INITIAL_COUNT, 3.2),
    []
  )

  const { nodes: fullNodes, edges: fullEdges } = useMemo(
    () => generateGraph(FULL_COUNT, 3.8),
    []
  )

  // Build Three.js geometries
  const nodesMaterial = useMemo(() =>
    new THREE.MeshBasicMaterial({ color: '#1A1A1A', transparent: true, opacity: 0.18 })
  , [])

  const edgeMaterial = useMemo(() =>
    new THREE.LineBasicMaterial({ color: '#1A1A1A', transparent: true, opacity: 0.08 })
  , [])

  const cursorNodeMaterial = useMemo(() =>
    new THREE.MeshBasicMaterial({ color: '#1A1A1A', transparent: true, opacity: 0.25 })
  , [])

  const cursorEdgeMaterial = useMemo(() =>
    new THREE.LineBasicMaterial({ color: '#1A1A1A', transparent: true, opacity: 0.10 })
  , [])

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.045, 8, 8), [])
  const cursorNodeGeo = useMemo(() => new THREE.SphereGeometry(0.07, 10, 10), [])

  // Build initial edge buffer
  const edgePositions = useMemo(() => {
    const positions = new Float32Array(fullEdges.length * 6)
    let idx = 0
    for (const [a, b] of fullEdges) {
      const pA = fullNodes[a].position
      const pB = fullNodes[b].position
      positions[idx++] = pA.x; positions[idx++] = pA.y; positions[idx++] = pA.z
      positions[idx++] = pB.x; positions[idx++] = pB.y; positions[idx++] = pB.z
    }
    return positions
  }, [fullEdges, fullNodes])

  // Cursor edges buffer (up to 5 connections)
  const cursorEdgePositions = useMemo(() => new Float32Array(5 * 6), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scroll = scrollProgress.current
    
    if (!groupRef.current) return

    // Blend between initial and full graph based on scroll
    const currentCount = Math.round(
      THREE.MathUtils.lerp(INITIAL_COUNT, FULL_COUNT, Math.min(scroll * 2.5, 1))
    )

    // Gentle group rotation — like the graph is slowly rotating in space
    groupRef.current.rotation.y = time * 0.018
    groupRef.current.rotation.x = Math.sin(time * 0.07) * 0.04

    // Animate each node with organic micro-movement
    const nodes = fullNodes

    nodeGeosRef.current.forEach((mesh, i) => {
      if (i >= currentCount || !mesh) return
      const node = nodes[i]

      // Organic breathing oscillation
      const ox = Math.sin(time * 0.4 + node.phase) * 0.025
      const oy = Math.cos(time * 0.35 + node.phase * 1.3) * 0.02
      const oz = Math.sin(time * 0.28 + node.phase * 0.7) * 0.015

      mesh.position.set(
        node.position.x + ox,
        node.position.y + oy,
        node.position.z + oz
      )
      mesh.visible = i < currentCount

      // Fade in new nodes as scroll reveals them
      const fadeThreshold = INITIAL_COUNT + ((FULL_COUNT - INITIAL_COUNT) * scroll * 2.5)
      const nodeMat = mesh.material as THREE.MeshBasicMaterial
      nodeMat.opacity = i < INITIAL_COUNT 
        ? 0.18 
        : Math.min(1, (fadeThreshold - i) * 0.5) * 0.18
    })

    // Update edge positions dynamically
    if (edgesRef.current) {
      const posAttr = edgesRef.current.geometry.attributes.position as THREE.BufferAttribute
      let idx = 0
      for (const [a, b] of fullEdges) {
        const meshA = nodeGeosRef.current[a]
        const meshB = nodeGeosRef.current[b]
        if (meshA && meshB && meshA.visible && meshB.visible && a < currentCount && b < currentCount) {
          posAttr.setXYZ(idx, meshA.position.x, meshA.position.y, meshA.position.z)
          posAttr.setXYZ(idx + 1, meshB.position.x, meshB.position.y, meshB.position.z)
        } else {
          // Hide edge by collapsing it
          posAttr.setXYZ(idx, 0, 0, -100)
          posAttr.setXYZ(idx + 1, 0, 0, -100)
        }
        idx += 2
      }
      posAttr.needsUpdate = true
    }

    // Cursor node interaction in 3D space
    if (cursorNodeRef.current && mouseStore.hasMoved) {
      // Unproject mouse to 3D plane at Z = -1
      const vec = new THREE.Vector3(mouseStore.ndcX, mouseStore.ndcY, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const targetZ = -1
      const distance = (targetZ - camera.position.z) / dir.z
      const worldPos = camera.position.clone().add(dir.multiplyScalar(distance))

      // Apply group inverse rotation so cursor node moves with the graph
      const invRotY = -groupRef.current.rotation.y
      const cx = worldPos.x * Math.cos(invRotY) - worldPos.z * Math.sin(invRotY)
      const cz = worldPos.x * Math.sin(invRotY) + worldPos.z * Math.cos(invRotY)

      cursorNodeRef.current.position.set(cx, worldPos.y, cz)

      // Find nearby nodes and draw edges to closest ones
      if (cursorEdgesRef.current) {
        const cPosAttr = cursorEdgesRef.current.geometry.attributes.position as THREE.BufferAttribute
        let edgeIdx = 0
        const cursorPos = cursorNodeRef.current.position

        const nearby = nodeGeosRef.current
          .filter((m, i) => m && m.visible && i < currentCount)
          .map(m => ({ m, dist: cursorPos.distanceTo(m.position) }))
          .filter(({ dist }) => dist < 1.4)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 4)

        for (const { m } of nearby) {
          cPosAttr.setXYZ(edgeIdx, cursorPos.x, cursorPos.y, cursorPos.z)
          cPosAttr.setXYZ(edgeIdx + 1, m.position.x, m.position.y, m.position.z)
          edgeIdx++
        }

        // Hide remaining unused edge slots
        for (let e = edgeIdx; e < 5; e++) {
          cPosAttr.setXYZ(e, 0, 0, -100)
          cPosAttr.setXYZ(e + 1, 0, 0, -100)
        }
        cPosAttr.needsUpdate = true
      }
    }
  })

  // Build initial edge geometry
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    return geo
  }, [edgePositions])

  const cursorEdgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(cursorEdgePositions, 3))
    return geo
  }, [cursorEdgePositions])

  return (
    <group ref={groupRef}>
      {/* All graph nodes */}
      {fullNodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) nodeGeosRef.current[i] = el }}
          geometry={nodeGeo}
          material={nodesMaterial}
          position={node.position}
          visible={i < INITIAL_COUNT}
        />
      ))}

      {/* Graph edges */}
      <lineSegments ref={edgesRef} geometry={edgeGeometry} material={edgeMaterial} />

      {/* Cursor node + its edges (on top of graph) */}
      <mesh ref={cursorNodeRef} geometry={cursorNodeGeo} material={cursorNodeMaterial} position={[0, 0, -100]} />
      <lineSegments ref={cursorEdgesRef} geometry={cursorEdgeGeometry} material={cursorEdgeMaterial} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// Scroll tracker (outside Three.js loop)
// ─────────────────────────────────────────────────────────
function ScrollTracker({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  useFrame(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
  })
  return null
}

export function Scene() {
  const scrollProgress = useRef(0)

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ScrollTracker scrollRef={scrollProgress} />
        <KnowledgeGraph scrollProgress={scrollProgress} />
        <Preload all />
      </Canvas>
    </div>
  )
}
