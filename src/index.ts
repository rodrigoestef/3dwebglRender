import "@styles/index.scss";
import { Grid } from "./Grid";

const $canvas = <HTMLCanvasElement>document.querySelector("#grid");
const gl = $canvas.getContext("webgl");
if (gl) {
  new Grid(gl);
} else {
  console.error("Your browser have not suport to webgl");
}
