import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class EncodeBase64Converter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.EncodeBase64;
  }
  async convert(text: string): Promise<string> {
    return Buffer.from(text).toString("base64");
  }
}
