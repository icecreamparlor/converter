import { COMMAND } from "../../settings";
import { snakeToCamel } from "../../util";
import { Converter } from "../converter";

export class SnakeToCamelConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.SnakeToCamel;
  }
  async convert(text: string): Promise<string> {
    return snakeToCamel(text);
  }
}
