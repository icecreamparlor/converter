import * as iconv from "iconv-lite";

import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class DecodeUriComponentWithEucKrConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.DecodeUriComponentWithEucKr;
  }
  async convert(text: string): Promise<string> {
    return this.decode(text);
  }

  private decode(target: string) {
    const allowList =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ;,/?:@&=+$-_.!~*'()#";

    const bytes = [];
    for (let i = 0; i < target.length; ) {
      if (target[i] === "%") {
        i++;
        const hex = target.substring(i, i + 2);
        const code = parseInt(hex, 16);
        if (allowList.includes(String.fromCharCode(code))) {
          bytes.push("%".charCodeAt(0));
          bytes.push(hex.charCodeAt(0));
          bytes.push(hex.charCodeAt(1));
        } else {
          bytes.push(code);
        }
        i += 2;
      } else {
        bytes.push(target.charCodeAt(i));
        i++;
      }
    }
    const buf = Buffer.from(bytes);
    return iconv.decode(buf, "euckr");
  }
}
