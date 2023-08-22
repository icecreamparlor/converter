import * as crypto from "crypto";

import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Sha256Converter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.SHA256;
  }
  async convert(text: string): Promise<string> {
    return crypto.createHash("sha256").update(text).digest("hex");
  }
}
