import * as changeCase from "change-case";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToConstantCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToConstantCase;
  }
  async convert(text: string): Promise<string> {
    return changeCase.constantCase(text);
  }
}
