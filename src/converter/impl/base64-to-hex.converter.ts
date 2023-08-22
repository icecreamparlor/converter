import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Base64ToHexConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Base64ToHex;
  }
  async convert(text: string): Promise<string> {
    return Buffer.from(text, "base64").toString("hex");
  }
}
