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
    for (let j = 0; j <= 8; j++) {
      for (let i = 0; i <= 8; i++) {
        result[i + j] =
          a[4 * (j % 4) + 0] * b[(i % 4) + 0] +
          a[4 * (j % 4) + 1] * b[(i % 4) + 4] +
          a[4 * (j % 4) + 2] * b[(i % 4) + 8] +
          a[4 * (j % 4) + 3] * b[(i % 4) + 12];
      }
    }
  }
}
