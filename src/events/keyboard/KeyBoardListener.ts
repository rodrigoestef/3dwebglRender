import { IKeyBoardEventListener } from "./KeyBoardEventManager";
import { IGetResoursesMatriz } from '../IgetResoursesMatriz'
import { Mat4 } from "@utils/Mat4";

export class KeyBoardListener implements IKeyBoardEventListener {
  cameraMatriz: number[];
  constructor(grid: IGetResoursesMatriz) {
    this.cameraMatriz = grid.getCameraMatriz();
  }

  pressW(): void {
    Mat4.translate(this.cameraMatriz, [0, 0, -0.5]);
  }
  pressA(): void {
    Mat4.translate(this.cameraMatriz, [0.5, 0, 0]);
  }
  pressD(): void {
    Mat4.translate(this.cameraMatriz, [-0.5, 0, 0]);
  }

  pressS(): void {
    Mat4.translate(this.cameraMatriz, [0, 0, 0.5]);
  }
}
