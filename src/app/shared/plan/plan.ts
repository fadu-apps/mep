import {
    afterNextRender,
    Component,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    viewChild
} from '@angular/core'
import { Plan } from '../../core/models/plan'

@Component({
    selector: 'app-plan',
    templateUrl: './plan.html',
    styleUrl: './plan.css',
})

export class PlanComponent {
    readonly plan = input.required<Plan>()
    private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
    private readonly destroyRef = inject(DestroyRef)

    private resizeObserver?: ResizeObserver

    constructor() {
        effect(() => this.draw())
        afterNextRender(() => this.initializeCanvas())
    }

    private initializeCanvas(): void {
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => this.draw())
            this.resizeObserver.observe(this.canvas()!.nativeElement)
        }
        this.destroyRef.onDestroy(() => this.resizeObserver?.disconnect())
        this.draw()
    }

    private draw(): void {
        const canvasReference = this.canvas()
        if (!canvasReference) return

        const canvas = canvasReference.nativeElement
        canvas.width = 800
        canvas.height = 500

        const context = canvas.getContext('2d')
        if (!context) return

        this.drawWall(context)
    }

    private drawWall(context: CanvasRenderingContext2D): void {
        const { start, end, thickness, length } = this.plan().wall
        if (length === 0) return

        const normalX = (-(end.y - start.y) / length) * (thickness / 2)
        const normalY = ((end.x - start.x) / length) * (thickness / 2)

        context.strokeStyle = '#151515';
        context.lineWidth = 1;
        context.beginPath()
        context.moveTo(start.x + normalX, start.y + normalY)
        context.lineTo(end.x + normalX, end.y + normalY)
        context.lineTo(end.x - normalX, end.y - normalY)
        context.lineTo(start.x - normalX, start.y - normalY)
        context.closePath()
        context.stroke()
    }
}
