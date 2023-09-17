import * as changeCase from "change-case";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ToSnakeCaseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ToSnakeCase;
  }
  async convert(text: string): Promise<string> {
    return changeCase.snakeCase(text);
  }
}
