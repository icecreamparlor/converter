import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToUpperCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToUpperCase;
  }
  async convert(text: string): Promise<string> {
    return text.toUpperCase();
  }
}
