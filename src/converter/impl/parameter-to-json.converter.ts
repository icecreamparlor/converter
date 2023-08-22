import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class ParameterToJsonConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.ParameterToJson;
  }
  async convert(parameter: string): Promise<string> {
    const params = new URLSearchParams(parameter);
    const json: Record<string, any> = {};

    for (const [key, value] of params.entries()) {
      json[key] = value;
    }

    return JSON.stringify(json, null, 2);
  }
}
