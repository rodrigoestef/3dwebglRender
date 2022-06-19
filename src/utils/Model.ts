import { WavefrontModel } from "../WavefrontModel";
import { IModel } from "../Grid";
import { Mat4 } from "./Mat4";

export class Model extends WavefrontModel implements IModel {
  location = Mat4.getUnitMatriz();
  rotation = Mat4.getUnitMatriz();
  getBuffer(): number[] {
    return this.buffer;
  }
  getgetUniformPosition(): {
    modelLocationUniform: number[];
    modelRotationUniform: number[];
  } {
    return {
      modelLocationUniform: this.location,
      modelRotationUniform: this.rotation,
    };
  }
}
