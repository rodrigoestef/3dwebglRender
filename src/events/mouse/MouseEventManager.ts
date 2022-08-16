export interface IMouseMoveListener {
  moveAxisX(x: number): void
  moveAxisY(x: number): void
}



export class MouseEventManager {

  constructor(private listener: IMouseMoveListener) { }

  onMove(e: MouseEvent) {
    if (Math.abs(e.movementX) > 0) {
      this.listener.moveAxisX(e.movementX)
    }

    if (Math.abs(e.movementY) > 0) {
      this.listener.moveAxisY(e.movementY)
    }
  }
}
