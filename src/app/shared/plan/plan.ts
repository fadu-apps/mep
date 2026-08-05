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
        const { x, y, width, height } = this.plan().wall;
        context.strokeStyle = '#151515';
        context.lineWidth = 1;
        context.strokeRect(x, y, width, height);
    }
}
