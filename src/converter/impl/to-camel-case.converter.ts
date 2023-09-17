import * as changeCase from "change-case";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToCamelCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToCamelCase;
  }
  async convert(text: string): Promise<string> {
    return changeCase.camelCase(text);
  }
}
