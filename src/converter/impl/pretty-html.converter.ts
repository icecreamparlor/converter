import * as prettier from "prettier";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class PrettyHtmlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.PrettyHtml;
  }
  async convert(text: string): Promise<string> {
    return prettier.format(text, { parser: "html" });
  }
}
