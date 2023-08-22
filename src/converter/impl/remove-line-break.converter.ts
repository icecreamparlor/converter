import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class RemoveLineBreakConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.RemoveLineBreak;
  }
  async convert(text: string): Promise<string> {
    return text.replace(/\n/g, "");
  }
}
