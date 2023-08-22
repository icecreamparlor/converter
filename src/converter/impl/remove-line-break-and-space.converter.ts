import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class RemoveLineBreakAndSpaceConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.RemoveLineBreakAndSpace;
  }
  async convert(text: string): Promise<string> {
    return text.replace(/\s/g, "");
  }
}
