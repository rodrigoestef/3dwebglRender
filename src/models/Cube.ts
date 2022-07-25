import { Mat4 } from "@utils/Mat4";
import { Model, IBindTexture } from "@utils/Model";

export class CubeModel extends Model {
  constructor(bindTexture: IBindTexture) {
    super("/public/cube.obj", bindTexture, "public/images/box.jpg");
    Mat4.translate(this.location, [1.5, 0, 4]);
  }
}
