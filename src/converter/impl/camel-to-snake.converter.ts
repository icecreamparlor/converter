import { COMMAND } from "../../settings";
import { camelToSnake } from "../../util";
import { Converter } from "../converter";

export class CamelToSnakeConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.CamelToSnake;
  }
  async convert(text: string): Promise<string> {
    return camelToSnake(text);
  }
}
