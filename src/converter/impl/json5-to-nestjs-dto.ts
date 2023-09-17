import * as vscode from "vscode";
import { COMMAND } from "../../settings";
import { die } from "../../util";
import { Converter } from "../converter";
import JSON5 = require("../../js/json5");

export class Json5ToNestjsDtoConverter implements Converter {
  private readonly swaggerModuleName = "Swagger";
  private readonly classValidatorModuleName = "ClassValidator";
  private readonly classTransformerModuleName = "ClassTransformer";

  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToNestjsDto;
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

    return this.convertToTypeScriptClass(obj, readonly, false);
  }

  private convertToTypeScriptClass(
    obj: Record<string, any>,
    readonly: boolean,
    createConstructor = true
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
          typeScriptClass += this.createDecorator(key, value, type);
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
          typeScriptClass += this.createDecorator(key, value, type);
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
          typeScriptClass += this.createDecorator(key, value, type);
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

      if (createConstructor) {
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
      }

      typeScriptClass += `}`;

      result[className] = typeScriptClass;
    }

    let importCode = "";
    importCode += `import * as ${this.swaggerModuleName} from '@nestjs/swagger';\n`;
    importCode += `import * as ${this.classValidatorModuleName} from 'class-validator';\n`;
    importCode += `import * as ${this.classTransformerModuleName} from 'class-transformer';\n`;

    const classCode = Object.values(result).reduce(
      (ac, code) => ac + "\n\n" + code
    );

    return [importCode, classCode].join("\n\n");
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

  private createDecorator(key: string, value: any, type: string): string {
    if (type === "string") {
      return `
  @${this.swaggerModuleName}.ApiProperty()
  @${this.classValidatorModuleName}.IsString()
`;
    }
    if (type === "number" || type === "bigint") {
      return `
  @${this.swaggerModuleName}.ApiProperty()
  @${this.classValidatorModuleName}.IsNumber()
`;
    }
    if (type === "boolean") {
      return `
  @${this.swaggerModuleName}.ApiProperty()
  @${this.classValidatorModuleName}.IsBoolean()
`;
    }

    if (type === "object" && key && Array.isArray(value)) {
      if (value.length > 0 && value[0] && !this.isPrimitive(value[0])) {
        return `
  @${this.swaggerModuleName}.ApiProperty()
  @${this.classTransformerModuleName}.Type(() => ${this.capitalizeFirstLetter(
          key
        )})
  @${this.classValidatorModuleName}.ValidateNested({
    each: true
  })
`;
      }

      if (this.isPrimitive(value[0])) {
        let result = "";
        result += `  @${this.swaggerModuleName}.ApiProperty()\n`;
        result += `  @${this.classValidatorModuleName}.IsArray()\n`;
        if (typeof value[0] === "string") {
          result += `  @${this.classValidatorModuleName}.IsString({ each: true })\n`;
        }
        if (typeof value[0] === "number") {
          result += `  @${this.classValidatorModuleName}.IsNumber({}, { each: true })\n`;
        }
        if (typeof value[0] === "boolean") {
          result += `  @${this.classValidatorModuleName}.IsBoolean({ each: true })\n`;
        }

        return result;
      }
    }

    if (type === "object" && key) {
      return `
  @${this.swaggerModuleName}.ApiProperty()
  @${this.classTransformerModuleName}.Type(() => ${this.capitalizeFirstLetter(
        key
      )})
  @${this.classValidatorModuleName}.ValidateNested()
`;
    }

    return "";
  }
}
