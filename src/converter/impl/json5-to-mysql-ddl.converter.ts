import * as JSON5 from "../../js/json5";
import { COMMAND } from "../../settings";

import { Converter } from "../converter";

export class Json5ToMysqlDdlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Json5ToMysqlDdl;
  }
  async convert(text: string): Promise<string> {
    const obj = JSON5.parse(text);
    const ddl = require("generate-schema").mysql(obj);

    return ddl;
  }
}
