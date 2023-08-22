import * as JSON5 from "../../js/json5";

import JSONToTypescript from "json-to-ts";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Json5ToTypescriptInterfaceConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToTypeScriptInterface;
  }
  async convert(jsonString: string): Promise<string> {
    const obj = JSON5.parse(jsonString);

    return JSONToTypescript(obj).reduce(
      (code, typescriptInterface) => `${code}\n\n${typescriptInterface}`,
      ""
    );
  }
}
