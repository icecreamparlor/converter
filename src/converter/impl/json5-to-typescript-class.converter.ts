import * as vscode from "vscode";
import { COMMAND } from "../../settings";
import { die } from "../../util";
import { Converter } from "../converter";
import JSON5 = require("../../js/json5");

export class Json5ToTypeScriptClassConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToTypeScriptClass;
  }

  async convert(json: string): Promise<string> {
    const obj = JSON5.parse(json);
    const input =
      (await vscode.window.showInputBox({
        placeHolder: "Convert Properties to Readonly?",
        prompt: "Convert Properties to Readonly?",
        value: "Y",
      })) ?? die(new Error("Please Enter Y or N"));
    const readonly = input.toUpperCase() === "Y";

    return this.convertToTypeScriptClass(obj, readonly);
  }

  private convertToTypeScriptClass(
    obj: Record<string, any>,
    readonly: boolean
  ): string {
    const result: Record<string, string> = {};
    const targets: {
      className: string;
      target: Record<string, any>;
      readonly: boolean;
    }[] = [];

    /** If Root JSON is Array, Iterate and Parse */
    if (Array.isArray(obj)) {
      obj.forEach((o, i) => {
        if (!this.isPrimitive(o)) {
          targets.push({
            className: `Root${i}`,
            target: o,
            readonly,
          });
        }
      });
    } else {
      targets.push({
        className: "Root",
        target: obj,
        readonly,
      });
    }

    while (targets.length > 0) {
      const { className, target } = targets.shift()!;
      const properties: {
        name: string;
        type: string;
        isArray: boolean;
      }[] = [];
      let typeScriptClass = `class ${className} {\n`;

      for (const key in target) {
        const value = target[key];
        const type = typeof value;

        if (Array.isArray(value)) {
          let arrayType = this.getTypeFromArray(value);

          const isPrimitiveType = value.every((v) => this.isPrimitive(v));
          if (!isPrimitiveType) {
            const nestedClassName = this.capitalizeFirstLetter(key);
            arrayType = nestedClassName;
            targets.push({
              readonly,
              className: nestedClassName,
              target: value.find((it) => !this.isPrimitive(it)),
            });
          }
          const propertyName = this.formatPropertyName(key);
          typeScriptClass += `  ${
            readonly ? "readonly" : ""
          } ${propertyName}: ${arrayType}[];\n`;
          properties.push({
            name: propertyName,
            type: arrayType,
            isArray: true,
          });
        } else if (type === "object" && value !== null) {
          const nestedClassName = this.capitalizeFirstLetter(key);
          const propertyName = this.formatPropertyName(key);
          typeScriptClass += `  ${
            readonly ? "readonly" : ""
          } ${propertyName}: ${nestedClassName};\n`;
          targets.push({
            readonly,
            className: nestedClassName,
            target: value,
          });
          properties.push({
            name: propertyName,
            type: nestedClassName,
            isArray: false,
          });
        } else {
          const propertyName = this.formatPropertyName(key);
          typeScriptClass += `  ${
            readonly ? "readonly" : ""
          } ${propertyName}: ${type};\n`;
          properties.push({
            name: propertyName,
            type,
            isArray: false,
          });
        }
      }

      typeScriptClass += `  
  constructor(
    ${properties
      .map(
        ({ name, type, isArray }) => `${name}: ${type}${isArray ? "[]" : ""}`
      )
      .join(",\n    ")}
  ) {
    ${properties.map(({ name }) => `this.${name} = ${name};`).join("\n    ")}
  }\n`;

      typeScriptClass += `}`;

      result[className] = typeScriptClass;
    }

    return Object.values(result).reduce((ac, code) => ac + "\n\n" + code);
  }

  private getTypeFromArray(array: any[]): string {
    if (array.length === 0) {
      return "any[]";
    }

    const types = new Set<string>();
    for (const item of array) {
      const type = typeof item;
      if (type === "object" && item !== null) {
        types.add(this.capitalizeFirstLetter(item.constructor.name));
      } else {
        types.add(type);
      }
    }

    return Array.from(types).join(" | ");
  }

  private formatPropertyName(name: string): string {
    return name.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\s]/g, "");
  }

  private capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  private isPrimitive(value: any): boolean {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value instanceof String ||
      value instanceof Number ||
      value instanceof Boolean
    );
  }
}
