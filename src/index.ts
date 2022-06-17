import "@styles/index.scss";
import { Grid } from "./Grid";

const $canvas = <HTMLCanvasElement>document.querySelector("#grid");
const gl = $canvas.getContext("webgl");
const init = async () => {
  try {
    if (!gl) {
      throw new Error("Your browser have not suport webgl");
    }

    const grid = await Grid.createInstance(gl);
    grid.bindBuffer();
    grid.bindAttributes();
    grid.draw();
  } catch (error) {
    console.error(error);
  }
};

window.onload = init;
