import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class JsonStringifiedToPlainConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JsonStringifiedToPlain;
  }
  async convert(jsonString: string): Promise<string> {
    let result = jsonString
      .replace(/\\\\/g, "\\")
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\\\"/g, '"')
      .replace(/\\t/g, "  ")
      .replace(/\\r/g, "\r");

    if (result.startsWith('"')) {
      result = result.slice(1);
    }
    if (result.endsWith('"')) {
      result = result.slice(0, -1);
    }

    return result;
  }
}
