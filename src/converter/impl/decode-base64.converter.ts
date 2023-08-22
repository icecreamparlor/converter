import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class DecodeBase64Converter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.DecodeBase64;
  }
  async convert(text: string): Promise<string> {
    return Buffer.from(text, "base64").toString("utf-8");
  }
}
