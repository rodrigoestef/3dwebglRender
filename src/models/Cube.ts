import { Mat4 } from "@utils/Mat4";
import { Model } from "@utils/Model";

export class CubeModel extends Model {
  constructor() {
    super("/public/cube.obj");
    Mat4.translate(this.location, [1.5, 0, 4]);
    this.texture = new Image();
    this.texture.src = "public/images/box.jpg";
  }
}
