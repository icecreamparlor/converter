import * as YAML from "yaml";
import { JSON5 } from "../../js/json5";
import { COMMAND } from "../../settings";

import { Converter } from "../converter";

export class Json5ToYamlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Json5ToYaml;
  }
  async convert(text: string): Promise<string> {
    const obj = JSON5.parse(text);

    return YAML.stringify(obj);
  }
}
