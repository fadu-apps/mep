export class Wall {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;

    constructor({ x, y, width, height }: WallDimensions) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export interface WallDimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}