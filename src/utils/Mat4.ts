export class Mat4 {
  public static getUnitMatriz() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
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
          a[i * 4] * b[j * 4] +
          a[i * 4 + 1] * b[j * 4 + 1] +
          a[i * 4 + 2] * b[j * 4 + 2] +
          a[i * 4 + 3] * b[j * 4 + 3];
        x++;
      }
    }
  }
}
