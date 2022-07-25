import { Mat4 } from "@utils/Mat4";
import { Model, IBindTexture } from "@utils/Model";

export class MonkeyModel extends Model {
  constructor(bindTexture: IBindTexture) {
    super("/public/monkey.obj", bindTexture, "public/images/monkey.png");
    Mat4.translate(this.location, [-1.5, 0, 4]);
  }

  getUniformPosition(): {
    modelLocationUniform: number[];
    modelRotationUniform: number[];
  } {
    Mat4.rotation(this.rotation, 1, [false, true, false]);
    return super.getUniformPosition();
  }
}
