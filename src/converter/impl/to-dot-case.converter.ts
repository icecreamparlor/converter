import * as changeCase from "change-case";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToDotCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToDotCase;
  }
  async convert(text: string): Promise<string> {
    return changeCase.dotCase(text);
  }
}
