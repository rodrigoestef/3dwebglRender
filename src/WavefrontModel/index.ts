import antlr4 from "antlr4";
import MyGrammarLexer from "../antlr/WavefrontOBJLexer";
import MyGrammarParser from "../antlr/WavefrontOBJParser";
import { WavefrontListener, IWavefrontObj } from "./listener";

export class WavefrontModel implements IWavefrontObj {
  private async fetchWavefront(): Promise<string> {
    return fetch(this.wavefrontPath).then((e) => e.text());
  }

  constructor(private wavefrontPath: string) {}

  buffer: number[] = [];

  addBufferLine(vertice: number[]): void {
    this.buffer = [...this.buffer, ...vertice];
  }

  public async getVertex(): Promise<void> {
    try {
      const input = await this.fetchWavefront();
      const chars = new antlr4.InputStream(input);
      const lexer = new MyGrammarLexer(chars);
      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new MyGrammarParser(tokens);
      parser.buildParseTrees = true;
      const tree = parser.start();

      antlr4.tree.ParseTreeWalker.DEFAULT.walk(
        new WavefrontListener(this),
        tree
      );
    } catch (error) {
      console.log(error);
    }
  }
}
