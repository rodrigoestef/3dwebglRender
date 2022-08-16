
export interface IKeyBoardEventListener {
  pressW(): void;
  pressA(): void;
  pressD(): void;
  pressS(): void;
}

export class KeyBoardEventManager {
  private keyTable: Record<string, () => void> = {};

  constructor(litener: IKeyBoardEventListener) {
    this.keyTable["w"] = () => litener.pressW();
    this.keyTable["a"] = () => litener.pressA();
    this.keyTable["d"] = () => litener.pressD();
    this.keyTable["s"] = () => litener.pressS();
  }

  onPress(event: KeyboardEvent) {
    const closure = this.keyTable[event.key];
    if (closure) closure();
  }
}
