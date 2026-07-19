import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Preload, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Abstract 3D protagonist (The "Glass Plexus" / Lattice)
function Plexus() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Continuous breathing and micro-movements (Life)
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    // Base organic rotation
    meshRef.current.rotation.y = time * 0.05
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.05
    // Breathing (scale)
    const scale = 1 + Math.sin(time * 0.5) * 0.02
    meshRef.current.scale.set(scale, scale, scale)
  })

  // Camera Scroll interaction
  useGSAP(() => {
    if (!meshRef.current) return

    // As user scrolls, the object morphs its rotation and comes closer
    gsap.to(meshRef.current.rotation, {
      y: Math.PI * 2,
      z: Math.PI / 4,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    gsap.to(meshRef.current.position, {
      z: 2, // Moves closer
      y: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      }
    })

  }, [])

  return (
    <Icosahedron ref={meshRef} args={[2, 16]} position={[0, 0, -2]}>
      <meshBasicMaterial 
        color="#F4F1EA" 
        wireframe={true} 
        transparent={true} 
        opacity={0.06} // Extremely subtle
      />
    </Icosahedron>
  )
}

// Floating particles for micro-interactions and depth
function Dust() {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Generate random particles
  const count = 300
  const positions = new Float32Array(count * 3)
  for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.02
  })

  // Scroll depth for particles
  useGSAP(() => {
    if (!pointsRef.current) return
    gsap.to(pointsRef.current.position, {
      z: 3,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#F4F1EA" transparent opacity={0.15} sizeAttenuation />
    </points>
  )
}

export function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-vanilla-bg mix-blend-difference">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 2]} 
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <Plexus />
        <Dust />
        <Preload all />
      </Canvas>
    </div>
  )
}
