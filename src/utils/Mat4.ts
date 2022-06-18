export class Mat4 {
  public static getUnitMatriz() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  public static translate(result: number[], vector: number[]) {
    // 1,0,0,0
    // 0,1,0,0
    // 0,0,1,0
    // a,b,c,1

    const unit = Mat4.getUnitMatriz();
    unit[12] = vector[0];
    unit[13] = vector[1];
    unit[14] = vector[2];
    Mat4.multiMatriz(result, result, unit);
  }

  public static createPerpective(
    angle: number,
    wperh: number,
    near: number,
    far: number
  ) {
    // w = z
    // x1 = wi/he*x0*f/w
    // y1 = y0*f/w
    // z1 = a/w + b
    // -1 = a/near + b | a = -near*(1+b)
    // 1  = a/far + b
    // -near = a + near*b
    // far  = a + far*b
    // near + far = b*(far -near) | b = (near+far)/(far-near)

    // z*w  = x*z0 +y
    // z = x + y/w

    const b = (near + far) / (far - near);
    const a = -near * (1 + b);

    const cotan = 1 / Math.tan((Math.PI * angle * 0.5) / 180);
    const perspective = Mat4.getUnitMatriz();

    // cotan*wperh, 0    , 0,  0
    // 0          , cotan, 0,  0
    // 0          , 0    , b,  1
    // 0          , 0    , a,  0

    perspective[0] = cotan * wperh;
    perspective[5] = cotan;
    perspective[10] = b;
    perspective[11] = 1;
    perspective[14] = a;
    perspective[15] = 0;
    return perspective;
  }

  public static multiMatriz(
    result: number[],
    matriz1: number[],
    matriz2: number[]
  ) {
    const a = [...matriz1];
    const b = [...matriz2];
    let x = 0;
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        result[x] =
          a[j * 4] * b[4 * 0 + i] +
          a[j * 4 + 1] * b[4 * 1 + i] +
          a[j * 4 + 2] * b[4 * 2 + i] +
          a[j * 4 + 3] * b[4 * 3 + i];
        x++;
      }
    }
  }
}
