import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class DecodeHexConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.DecodeHex;
  }
  async convert(text: string): Promise<string> {
    return Buffer.from(text, "hex").toString("utf-8");
  }
}
