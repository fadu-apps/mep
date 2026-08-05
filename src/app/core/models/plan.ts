import { Wall } from './wall';

/**
 * Architectural plan domain model.
 * It deliberately knows only its architectural elements, not how they are displayed.
 */
export class Plan {
  constructor(readonly wall: Wall) {}
}
