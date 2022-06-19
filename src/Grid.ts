import { Mat4 } from "@utils/Mat4";

export interface IModel {
  getBuffer(): number[];
  getgetUniformPosition(): {
    modelLocationUniform: number[];
    modelRotationUniform: number[];
  };
}

export class Grid {
  perspectiveMatriz = Mat4.createPerpective(90, 1, 0.01, 10);
  cameraMatriz = Mat4.getUnitMatriz();
  program: WebGLProgram;
  buffer: WebGLBuffer;
  models: IModel[] = [];

  attachModel(model: IModel) {
    this.models.push(model);
  }

  bindBuffer(data: number[]) {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(data),
      this.gl.STATIC_DRAW
    );
  }

  bindCameraUniform() {
    const cameraLocation = this.gl.getUniformLocation(
      this.program,
      "uCameraMat"
    );
    const perspectiveLocation = this.gl.getUniformLocation(
      this.program,
      "uPerspectiveMat"
    );
    this.gl.uniformMatrix4fv(
      cameraLocation,
      false,
      new Float32Array(this.cameraMatriz)
    );
    this.gl.uniformMatrix4fv(
      perspectiveLocation,
      false,
      new Float32Array(this.perspectiveMatriz)
    );
  }

  bindModelUniforms(model: IModel) {
    const locationlocation = this.gl.getUniformLocation(
      this.program,
      "uLocationModelMat"
    );
    const rotationlocation = this.gl.getUniformLocation(
      this.program,
      "uRotationModelMat"
    );
    const { modelLocationUniform, modelRotationUniform } =
      model.getgetUniformPosition();

    this.gl.uniformMatrix4fv(
      rotationlocation,
      false,
      new Float32Array(modelRotationUniform)
    );
    this.gl.uniformMatrix4fv(
      locationlocation,
      false,
      new Float32Array(modelLocationUniform)
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
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
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
      8 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    this.gl.enableVertexAttribArray(aVertexPositionLocation);
  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    for (const model of this.models) {
      const buffer = model.getBuffer();
      this.bindBuffer(buffer);
      this.bindAttributes();
      this.bindModelUniforms(model);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, buffer.length / 8);
    }
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
