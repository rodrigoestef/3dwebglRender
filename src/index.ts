import "@styles/index.scss";
import { Mat4 } from "@utils/Mat4";
import { Grid } from "./Grid";
import { CubeModel } from "./models/Cube";
import { MonkeyModel } from "./models/Monkey";

const $canvas = <HTMLCanvasElement>document.querySelector("#grid");
const gl = $canvas.getContext("webgl");
const init = async () => {
  try {
    if (!gl) {
      throw new Error("Your browser have not suport webgl");
    }

    const grid = await Grid.createInstance(gl);
    const cube = new CubeModel();
    const monkey = new MonkeyModel();
    await cube.getVertex();
    await monkey.getVertex();
    Mat4.translate(cube.location, [1.5, 0, 0]);
    Mat4.translate(monkey.location, [-1.5, 0, 0]);
    grid.attachModel(cube);
    grid.attachModel(monkey);
    Mat4.translate(grid.cameraMatriz, [0, 0, 4]);
    grid.bindCameraUniform();
    const render = () => {
      grid.draw();
      requestAnimationFrame((a) => {
        render();
      });
    };
    render();
  } catch (error) {
    console.error(error);
  }
};

window.onload = init;
