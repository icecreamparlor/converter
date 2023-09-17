import * as changeCase from "change-case";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToPascalCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToPascalCase;
  }
  async convert(text: string): Promise<string> {
    return changeCase.pascalCase(text);
  }
}
