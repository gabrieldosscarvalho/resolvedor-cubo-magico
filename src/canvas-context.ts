export class CanvasContext {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly dom: HTMLCanvasElement
  ) {}
}
