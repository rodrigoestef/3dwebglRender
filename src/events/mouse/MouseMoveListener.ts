import { IMouseMoveListener } from './MouseEventManager'
import { IGetResoursesMatriz } from '../IgetResoursesMatriz'
import { Mat4 } from "@utils/Mat4";

export class MouseMoveListener implements IMouseMoveListener {

  cameraMatriz: number[]

  constructor(getResoursesMatriz: IGetResoursesMatriz) {
    this.cameraMatriz = getResoursesMatriz.getCameraMatriz();
  }


  moveAxisX(x: number): void {
    Mat4.rotation(this.cameraMatriz, 1 * x, [false, true, false])
  }

  moveAxisY(y: number): void {
    //Mat4.rotation(this.cameraMatriz, -1 * y, [true, false, false])
  }

}
