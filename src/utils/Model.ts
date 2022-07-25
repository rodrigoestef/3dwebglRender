import { WavefrontModel } from "../WavefrontModel";
import { IModel } from "../Grid";
import { Mat4 } from "./Mat4";

export interface IBindTexture {
  bindTexture(texture: HTMLImageElement): number;
  getDafaultTexture(): number;
}

export class Model extends WavefrontModel implements IModel {
  constructor(
    wavefrontPath: string,
    bindTexture: IBindTexture,
    texturePath?: string
  ) {
    super(wavefrontPath);
    this.texture = bindTexture.getDafaultTexture();
    if (texturePath) {
      const Texture = new Image();
      Texture.src = texturePath;
      Texture.onload = () => {
        this.texture = bindTexture.bindTexture(Texture);
      };
    }
  }

  location = Mat4.getUnitMatriz();
  rotation = Mat4.getUnitMatriz();
  texture: number;
  getBuffer(): number[] {
    return this.buffer;
  }
  getTexture(): number {
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
