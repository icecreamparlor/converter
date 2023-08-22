import * as crypto from "crypto";

import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Sha512Converter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.SHA512;
  }

  async convert(text: string): Promise<string> {
    return crypto.createHash("sha512").update(text).digest("hex");
  }
}
