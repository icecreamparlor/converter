import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class EvalJavascriptConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.EvalJavascript;
  }
  async convert(text: string): Promise<string> {
    return eval(text);
  }
}
