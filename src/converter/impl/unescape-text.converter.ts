import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class UnescapeTextConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.UnescapeText;
  }
  async convert(text: string): Promise<string> {
    return text.replace(/\\(.)/g, "$1");
  }
}
