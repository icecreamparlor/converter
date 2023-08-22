import * as JSON5 from "../../js/json5";
import { COMMAND } from "../../settings";

import { Converter } from "../converter";

export class Json5ToMongooseConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Json5ToMongoose;
  }
  async convert(text: string): Promise<string> {
    const obj = JSON5.parse(text);
    const schema = require("generate-schema").mongoose(obj);

    return JSON.stringify(schema, null, 2);
  }
}
