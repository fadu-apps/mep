import { Wall } from '../../core/models/wall'

const POINTER_TOLERANCE = 4

/** Presentation geometry: it is intentionally separate from the Wall model. */
export function isPointOverWall(wall: Wall, x: number, y: number): boolean {
    const { start, end, thickness, length } = wall
    if (length === 0) return false

    const directionX = (end.x - start.x) / length
    const directionY = (end.y - start.y) / length
    const relativeX = x - start.x
    const relativeY = y - start.y
    const distanceAlongWall = relativeX * directionX + relativeY * directionY

    if (distanceAlongWall < 0 || distanceAlongWall > length) return false

    const distanceFromCenterLine = Math.abs(relativeX * -directionY + relativeY * directionX)
    return distanceFromCenterLine <= thickness / 2 + POINTER_TOLERANCE
}
