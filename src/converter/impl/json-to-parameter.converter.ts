import { JSON5 } from "../../js/json5";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Json5ToParameterConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Json5ToParameter;
  }
  async convert(jsonString: string): Promise<string> {
    const json = JSON5.parse(jsonString);
    const params = new URLSearchParams();
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        params.append(key, json[key]);
      }
    }

    return params.toString();
  }
}
