import "@styles/index.scss";
import { Grid } from "./Grid";
import { CubeModel } from "./models/Cube";
import { MonkeyModel } from "./models/Monkey";
import { KeyBoardEventManager } from "./events/keyboard/KeyBoardEventManager";
import { KeyBoardListener } from "./events/keyboard/KeyBoardListener";
import { MouseEventManager } from "./events/mouse/MouseEventManager";
import { MouseMoveListener } from "./events/mouse/MouseMoveListener";

const $canvas = <HTMLCanvasElement>document.querySelector("#grid");
const $fpsIndicator = <HTMLElement>document.querySelector("#fpsIndicator");
const gl = $canvas.getContext("webgl");
let timer = 0;
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

    const keyBoardListener = new KeyBoardListener(grid);
    const keyBoardEventManager = new KeyBoardEventManager(keyBoardListener);

    const mouveMoveListener = new MouseMoveListener(grid)
    const mouseEventManager = new MouseEventManager(mouveMoveListener);

    document.body.onkeydown = (ev) => keyBoardEventManager.onPress(ev);
    document.body.onmousemove = (ev) => mouseEventManager.onMove(ev);

    const render = () => {
      grid.draw();
      requestAnimationFrame((a) => {
        a = a / 1000;
        $fpsIndicator.innerText = (1 / (a - timer)).toFixed(2);
        timer = a;
        render();
      });
    };
    render();
  } catch (error) {
    console.error(error);
  }
};

window.onload = init;
