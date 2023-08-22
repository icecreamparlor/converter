import * as JSON5 from "../../js/json5";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Json5ToJsonConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToJson;
  }
  async convert(text: string): Promise<string> {
    const obj = JSON5.parse(text);
    return JSON.stringify(obj, null, 2);
  }
}
