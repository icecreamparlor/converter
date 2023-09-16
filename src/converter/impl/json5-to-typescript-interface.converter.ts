import * as vscode from "vscode";
import * as JSON5 from "../../js/json5";

import JSONToTypescript from "json-to-ts";
import { COMMAND } from "../../settings";
import { die } from "../../util";
import { Converter } from "../converter";

export class Json5ToTypescriptInterfaceConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToTypeScriptInterface;
  }
  async convert(jsonString: string): Promise<string> {
    const obj = JSON5.parse(jsonString);
    const input =
      (await vscode.window.showInputBox({
        placeHolder: "Convert Properties to Readonly?",
        prompt: "Convert Properties to Readonly?",
        value: "Y",
      })) ?? die(new Error("Please Enter Y or N"));
    const isReadonly = input.toUpperCase() === "Y";

    return JSONToTypescript(obj).reduce((code, typescriptInterface) => {
      if (!isReadonly) {
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
        const regexp = /([\s]*)([a-zA-Z가-힣]+)(:[\s]*)([a-zA-Z가-힣\[\]]+;)/g;

        if (cv.match(regexp)) {
          return [...ac, cv.replace(regexp, `$1readonly $2$3$4`)];
        }

        return [...ac, cv];
      }, [] as string[])
      .join("\n");
  }
}
