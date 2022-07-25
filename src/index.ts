import "@styles/index.scss";
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
    const cube = new CubeModel(grid);
    const monkey = new MonkeyModel(grid);
    await cube.getVertex();
    await monkey.getVertex();
    grid.attachModel(cube);
    grid.attachModel(monkey);
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
