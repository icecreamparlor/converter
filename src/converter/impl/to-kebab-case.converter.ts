import * as changeCase from "change-case";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToKebabCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToKebabCase;
  }
  async convert(text: string): Promise<string> {
    return changeCase.paramCase(text);
  }
}
