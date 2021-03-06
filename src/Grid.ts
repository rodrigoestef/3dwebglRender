import { Mat4 } from "@utils/Mat4";

export interface IModel {
  getBuffer(): number[];
  getTexture(): HTMLImageElement | undefined;
  getUniformPosition(): {
    modelLocationUniform: number[];
    modelRotationUniform: number[];
  };
}

export class Grid {
  perspectiveMatriz = Mat4.createPerpective(90, 1, 0.01, 10);
  cameraMatriz = Mat4.getUnitMatriz();
  program: WebGLProgram;
  buffer: WebGLBuffer;
  texture: WebGLTexture;
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
      model.getUniformPosition();

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
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }

  bindTexture(image?: HTMLImageElement) {
    if (!image) {
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        1,
        1,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255, 255])
      );
    } else {
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        image
      );
    }
    // this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.REPEAT
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.REPEAT
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
  }

  bindAttributes() {
    const aVertexPositionLocation = this.gl.getAttribLocation(
      this.program,
      "aVertexPosition"
    );
    const aNormalPositionLocation = this.gl.getAttribLocation(
      this.program,
      "aNormalPosition"
    );
    const aTexturePositionLocation = this.gl.getAttribLocation(
      this.program,
      "aTexturePosition"
    );
    this.gl.vertexAttribPointer(
      aVertexPositionLocation,
      3,
      this.gl.FLOAT,
      false,
      8 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    this.gl.vertexAttribPointer(
      aTexturePositionLocation,
      2,
      this.gl.FLOAT,
      false,
      8 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    this.gl.vertexAttribPointer(
      aNormalPositionLocation,
      3,
      this.gl.FLOAT,
      false,
      8 * Float32Array.BYTES_PER_ELEMENT,
      5 * Float32Array.BYTES_PER_ELEMENT
    );
    this.gl.enableVertexAttribArray(aVertexPositionLocation);
    this.gl.enableVertexAttribArray(aTexturePositionLocation);
    this.gl.enableVertexAttribArray(aNormalPositionLocation);
  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    for (const model of this.models) {
      const buffer = model.getBuffer();
      this.bindBuffer(buffer);
      this.bindAttributes();
      this.bindTexture(model.getTexture());
      this.bindModelUniforms(model);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, buffer.length / 8);
    }
  }

  static async createInstance(gl: WebGLRenderingContext) {
    const c = new Grid(gl);
    await c.initProgram();
    c.bindCameraUniform();
    return c;
  }

  private constructor(private gl: WebGLRenderingContext) {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    const texture = this.gl.createTexture();
    const program = this.gl.createProgram();
    const buffer = this.gl.createBuffer();
    if (!program) {
      throw new Error("Cannot create program");
    }
    if (!texture) {
      throw new Error("Cannot create texture");
    }
    if (!buffer) {
      throw new Error("Cannot create buffer");
    }

    this.buffer = buffer;
    this.program = program;
    this.texture = texture;
  }
}
