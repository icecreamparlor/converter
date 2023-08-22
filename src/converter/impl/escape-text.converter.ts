import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class EscapeTextConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.EscapeText;
  }
  async convert(text: string): Promise<string> {
    const escapeChars = {
      "\n": "\\n",
      "\r": "\\r",
      "\t": "\\t",
      '"': '\\"',
      "'": "\\'",
      "\\": "\\\\",
    };

    return text.replace(
      /[\n\r\t\"\'\\]/g,
      (match) => escapeChars[match as keyof typeof escapeChars]
    );
  }
}
