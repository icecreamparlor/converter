import * as vscode from "vscode";
import { JSON5 } from "../../js/json5";

import JSONToTypescript from "json-to-ts";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Json5ToTypescriptInterfaceConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToTypeScriptInterface;
  }
  async convert(jsonString: string): Promise<string> {
    const obj = JSON5.parse(jsonString);
    const input = await vscode.window.showInformationMessage(
      "Select mutability of properties",
      { modal: true },
      "mutable",
      "readonly"
    );
    if (!input) {
      return jsonString;
    }
    const readonly = input === "readonly";

    return JSONToTypescript(obj).reduce((code, typescriptInterface) => {
      if (!readonly) {
        return `${code}\n\n${typescriptInterface}`;
      }

      return `${code}\n\n${this.convertToReadonlyInterface(
        typescriptInterface
      )}`;
    }, "");
  }

  private convertToReadonlyInterface(code: string): string {
    return code
      .split("\n")
      .reduce((ac, cv) => {
        const regexp =
          /([\s]*)([_a-zA-Z가-힣]+)(:[\s]*)([_a-zA-Z가-힣\[\]]+;)/g;

        if (cv.match(regexp)) {
          return [...ac, cv.replace(regexp, `$1readonly $2$3$4`)];
        }

        return [...ac, cv];
      }, [] as string[])
      .join("\n");
  }
}
