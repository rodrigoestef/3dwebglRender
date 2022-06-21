import { WavefrontModel } from "../WavefrontModel";
import { IModel } from "../Grid";
import { Mat4 } from "./Mat4";

export class Model extends WavefrontModel implements IModel {
  location = Mat4.getUnitMatriz();
  rotation = Mat4.getUnitMatriz();
  texture?: HTMLImageElement;
  getBuffer(): number[] {
    return this.buffer;
  }
  getTexture(): HTMLImageElement | undefined {
    return this.texture;
  }
  getUniformPosition(): {
    modelLocationUniform: number[];
    modelRotationUniform: number[];
  } {
    return {
      modelLocationUniform: this.location,
      modelRotationUniform: this.rotation,
    };
  }
}
