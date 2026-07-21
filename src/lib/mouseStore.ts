// Shared mouse position store between CursorTrail canvas and Three.js Scene
export const mouseStore = {
  x: -9999,
  y: -9999,
  // Normalized device coords for Three.js (-1 to 1)
  ndcX: -9999,
  ndcY: -9999,
  hasMoved: false,
}
