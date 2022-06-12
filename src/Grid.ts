export class Grid {
  constructor(private gl: WebGLRenderingContext) {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}
