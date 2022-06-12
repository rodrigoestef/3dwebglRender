import "@styles/index.scss";
import { WavefrontModel } from "./WavefrontModel";

const a = new WavefrontModel("/public/cube.obj");

a.getVertex().then(() => {
  console.log(a.buffer);
});
