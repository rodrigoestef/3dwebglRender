import { Mat4 } from "@utils/Mat4";

describe("it will test mat4 class", () => {
  it("must result 2 matriz product", () => {
    const unit = Mat4.getUnitMatriz();
    const mt = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    Mat4.multiMatriz(unit, unit, mt);
    for (const u of unit) {
      expect(u).toBe(2);
    }
    const sequencial = Array.from({ length: 16 }, (_, i) => i + 1);

    Mat4.multiMatriz(unit, sequencial, sequencial);

    const result = [
      90, 100, 110, 120, 202, 228, 254, 280, 314, 356, 398, 440, 426, 484, 542,
      600,
    ];

    for (let index = 0; index < result.length; index++) {
      const element1 = result[index];
      const element2 = unit[index];
      expect(element1).toEqual(element2);
    }
  });

  it("must create perspective matriz", () => {
    const vector = Mat4.getUnitMatriz();
    const result = Mat4.getUnitMatriz();
    vector[0] = 1;
    vector[1] = 1;
    vector[2] = -100;
    vector[3] = 1;
    const perspective = Mat4.createPerpective(90, 1, 0.01, 100);
    Mat4.multiMatriz(result, vector, perspective);
    let w = result[3];
    result.forEach((_, i) => (result[i] = result[i] / w));
    expect(Math.abs(result[2] - 1) < 0.1).toBe(true);

    vector[2] = -0.01;
    Mat4.multiMatriz(result, vector, perspective);
    w = result[3];
    result.forEach((_, i) => (result[i] = result[i] / w));
    expect(Math.abs(result[2] + 1) < 0.1).toBe(true);
  });
});
