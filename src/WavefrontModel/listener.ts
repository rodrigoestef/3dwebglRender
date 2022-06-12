import WavefrontOBJListener from "../antlr/WavefrontOBJListener";

export interface IWavefrontObj {
  addBufferLine(vertice: number[]): void;
}

export class WavefrontListener extends WavefrontOBJListener {
  constructor(private waveFront: IWavefrontObj) {
    super();
  }
  vertexes: number[][] = [];
  normals: number[][] = [];
  textures: number[][] = [];

  vertexTable: { [key: string]: number[][] } = {
    vertex: this.vertexes,
    normal: this.normals,
    texture: this.textures,
  };

  resolve(ctx: any, type: string) {
    const vertex: number[] = [];
    for (let index = 1; index < ctx.children.length; index++) {
      const element = ctx.children[index];
      vertex.push(Number(element.start.text));
    }
    this.vertexTable[type].push(vertex);
  }

  enterVertex(ctx: any): void {
    this.resolve(ctx, "vertex");
  }

  enterVertex_normal(ctx: any): void {
    this.resolve(ctx, "normal");
  }

  enterVertex_texture(ctx: any): void {
    this.resolve(ctx, "texture");
  }
  enterFaces(ctx: any): void {
    let linebuffer: number[] = [];
    for (let index = 1; index < ctx.children.length; index++) {
      const element = ctx.children[index];
      const face = element.symbol.text.split("/").map((e: string) => Number(e));
      linebuffer = [...linebuffer, ...this.vertexes[face[0] - 1]];
      linebuffer = [...linebuffer, ...this.textures[face[1] - 1]];
      linebuffer = [...linebuffer, ...this.normals[face[2] - 1]];
    }
    this.waveFront.addBufferLine(linebuffer);
  }
}
