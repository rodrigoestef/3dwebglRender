export class Grid {
  bufferData: number[] = [-1, 0, 0, 1, 0, 0, 0, 1, 0];
  program: WebGLProgram;
  buffer: WebGLBuffer;

  bindBuffer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.bufferData),
      this.gl.STATIC_DRAW
    );
  }

  async initProgram() {
    const vertexShaderCode = await fetch(
      "/public/shaders/vertexShader.glsl"
    ).then((e) => e.text());
    const fragmentShaderCode = await fetch(
      "/public/shaders/fragmentShader.glsl"
    ).then((e) => e.text());

    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      throw new Error("cannot create shader");
    }

    this.gl.shaderSource(vertexShader, vertexShaderCode);
    this.gl.shaderSource(fragmentShader, fragmentShaderCode);

    this.gl.compileShader(vertexShader);
    this.gl.compileShader(fragmentShader);
    if (
      !this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS) ||
      !this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)
    ) {
      console.log(this.gl.getShaderInfoLog(vertexShader));
      console.log(this.gl.getShaderInfoLog(fragmentShader));
      throw new Error("Compile shader error");
    }

    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);

    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      throw new Error("cannot link program");
    }
    this.gl.useProgram(this.program);
  }

  bindAttributes() {
    const aVertexPositionLocation = this.gl.getAttribLocation(
      this.program,
      "aVertexPosition"
    );
    this.gl.vertexAttribPointer(
      aVertexPositionLocation,
      3,
      this.gl.FLOAT,
      false,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    this.gl.enableVertexAttribArray(aVertexPositionLocation);
  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }

  static async createInstance(gl: WebGLRenderingContext) {
    const c = new Grid(gl);
    await c.initProgram();
    return c;
  }

  private constructor(private gl: WebGLRenderingContext) {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    const program = this.gl.createProgram();
    const buffer = this.gl.createBuffer();
    if (!program) {
      throw new Error("Cannot create program");
    }

    if (!buffer) {
      throw new Error("Cannot create buffer");
    }

    this.buffer = buffer;
    this.program = program;
  }
}
