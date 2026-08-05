export class Wall {
    readonly start: Point
    readonly end: Point
    readonly thickness: number

    constructor({ start, end, thickness }: WallDimensions) {
        this.start = start
        this.end = end
        this.thickness = thickness
    }

    get length(): number {
        return Math.hypot(this.end.x - this.start.x, this.end.y - this.start.y)
    }
}

export interface WallDimensions {
    start: Point
    end: Point
    thickness: number
}

export interface Point {
    x: number
    y: number
}
