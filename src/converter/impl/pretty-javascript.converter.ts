import * as prettier from "prettier";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class PrettyJavaScriptConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.PrettyJavaScript;
  }
  async convert(text: string): Promise<string> {
    return prettier.format(text);
  }
}
