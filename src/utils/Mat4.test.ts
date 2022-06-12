import { Mat4 } from "@utils/Mat4";

describe("it will test mat4 class", () => {
  it("must result 2 matriz product", () => {
    const unit = Mat4.getUnitMatriz();
    const mt = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    Mat4.multiMatriz(unit, unit, mt);
    for (const u of unit) {
      expect(u).toBe(2);
    }
  });
});
