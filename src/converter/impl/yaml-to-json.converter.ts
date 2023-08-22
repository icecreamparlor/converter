import * as YAML from "yaml";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class YamlToJsonConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.YamlToJson;
  }
  async convert(text: string): Promise<string> {
    return JSON.stringify(YAML.parse(text), null, 2);
  }
}
