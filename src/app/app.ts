import { Component } from '@angular/core'

import { Plan } from './core/models/plan'
import { Wall } from './core/models/wall'
import { PlanComponent } from './shared/plan/plan'

@Component({
    selector: 'app-root',
    imports: [PlanComponent],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly plan = new Plan(
        new Wall({ x: 100, y: 230, width: 500, height: 15 })
    )
}
