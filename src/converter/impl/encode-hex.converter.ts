import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class EncodeHexConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.EncodeHex;
  }
  async convert(text: string): Promise<string> {
    return Buffer.from(text).toString("hex");
  }
}
