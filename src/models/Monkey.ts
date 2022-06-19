import { Mat4 } from "@utils/Mat4";
import { Model } from "@utils/Model";

export class MonkeyModel extends Model {
  constructor() {
    super("/public/monkey.obj");
  }

  getUniformPosition(): {
    modelLocationUniform: number[];
    modelRotationUniform: number[];
  } {
    Mat4.rotation(this.rotation, 1, [false, true, false]);
    return super.getUniformPosition();
  }
}
