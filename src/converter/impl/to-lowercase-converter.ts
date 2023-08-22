import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToLowerCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToLowerCase;
  }
  async convert(text: string): Promise<string> {
    return text.toLowerCase();
  }
}
