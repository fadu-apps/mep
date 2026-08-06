import {
    Component,
    computed,
    effect,
    ElementRef,
    input,
    output,
    Signal,
    viewChild
} from '@angular/core'
import { Plan } from '../../core/models/plan'
import { Wall } from '../../core/models/wall'
import { isPointOverWall } from './wall-hit-test'

@Component({
    selector: 'app-plan',
    templateUrl: './plan.html',
    styleUrl: './plan.css',
})

export class PlanComponent {
    readonly plan = input.required<Plan>()
    readonly wallClick = output<Wall>()
    private readonly _canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

    private readonly _context: Signal<CanvasRenderingContext2D | null | undefined> = computed(() => {
        return this._canvas()?.nativeElement.getContext('2d')
    })

    private readonly _bounds: Signal<DOMRect | null | undefined> = computed(() => {
        return this._canvas()?.nativeElement.getBoundingClientRect()
    })

    constructor() {
        effect(() => this.draw())
    }

    private draw(): void {
        this.initCanvaSize()
        this.drawWall(this.plan().wall)
    }

    private initCanvaSize(): void {
        const canvas = this._canvas()!.nativeElement
        const bounds = canvas.getBoundingClientRect()
        const pixelRatio = window.devicePixelRatio || 1
        
        canvas.width = Math.round(bounds.width * pixelRatio)
        canvas.height = Math.round(bounds.height * pixelRatio)
    }

    private drawWall(wall: Wall): void {
        const { start, end, thickness, length } = wall
        
        const normalX = (-(end.y - start.y) / length) * (thickness / 2)
        const normalY = ((end.x - start.x) / length) * (thickness / 2)

        this._context()!.fillStyle = '#ffffff'
        this._context()!.strokeStyle = '#151515'
        this._context()!.lineWidth = 1
        this._context()!.beginPath()
        this._context()!.moveTo(start.x + normalX, start.y + normalY)
        this._context()!.lineTo(end.x + normalX, end.y + normalY)
        this._context()!.lineTo(end.x - normalX, end.y - normalY)
        this._context()!.lineTo(start.x - normalX, start.y - normalY)
        this._context()!.closePath()
        this._context()!.fill()
        this._context()!.stroke()
    }

    onCanvasClick(event: MouseEvent): void {
        const x = ((event.clientX - this._bounds()!.left) / this._bounds()!.width) * this._canvas()!.nativeElement.width
        const y = ((event.clientY - this._bounds()!.top) / this._bounds()!.height) * this._canvas()!.nativeElement.height
        const wall = this.plan().wall

        if (isPointOverWall(wall, x, y)) {
            this.wallClick.emit(wall)
        }
    }
}
