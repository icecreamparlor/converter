import { COMMAND } from "../../settings";
import { capitalizeFirstLetter } from "../../util";
import { Converter } from "../converter";
import JSON5 = require("../../js/json5");

export class Json5ToKotlinDataClassConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Json5ToKotlinDataClass;
  }
  async convert(text: string): Promise<string> {
    const obj = JSON5.parse(text);
    return this.convertToKotlinDataClass(obj, "Root");
  }

  private convertToKotlinDataClass(
    obj: Record<string, any>,
    className: string
  ): string {
    let code = "";
    const targets: {
      className: string;
      target: Record<string, any>;
    }[] = [
      {
        className,
        target: obj,
      },
    ];

    while (targets.length > 0) {
      let current = targets.shift()!;
      let properties = "";

      for (let key in current.target) {
        const value = current.target[key];
        const valueType = typeof value;
        const isPrimitiveType = !!this.convertToKotlinPrimitiveType(value);
        let kotlinType = "";

        if (isPrimitiveType) {
          kotlinType = this.convertToKotlinPrimitiveType(value)!;
        } else if (
          valueType === "object" &&
          Array.isArray(value) &&
          value.length === 0
        ) {
          kotlinType = `List<Any>`;
        } else if (
          valueType === "object" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          const className = capitalizeFirstLetter(key);
          kotlinType = `List<${className}>`;
          const isPrimitiveType = value.some((v) =>
            this.convertToKotlinPrimitiveType(v)
          );
          if (isPrimitiveType) {
            const primitiveTypes: Set<string> = value.reduce(
              (ac: Set<string>, v) => {
                const type = this.convertToKotlinPrimitiveType(v);
                if (type) {
                  ac.add(type);
                }
                return ac;
              },
              new Set()
            );

            if (primitiveTypes.size === 1) {
              kotlinType = `List<${this.convertToKotlinPrimitiveType(
                value[0]
              )}>`;
            } else {
              kotlinType = "List<String>";
            }
            // Mixed Array 인 경우 List<String> 으로 고정
            // BigDecimal
          } else {
            targets.push({
              className,
              target: value[0],
            });
          }
        } else if (valueType === "object" && value !== null) {
          const className = capitalizeFirstLetter(key);
          kotlinType = className;
          targets.push({
            className,
            target: value,
          });
        } else {
          kotlinType = "Any";
        }

        properties += `  val ${key}: ${kotlinType},\n`;
      }
      const kotlinClass = `data class ${current.className}(\n${properties})`;
      code += kotlinClass + "\n\n";
    }
    return code;
  }

  private convertToKotlinPrimitiveType(value: string): string | undefined {
    const valueType = typeof value;
    if (valueType === "string") {
      return "String";
    } else if (valueType === "number") {
      return "BigDecimal";
      // return Number.isInteger(value) ? "Int" : "Double";
    } else if (valueType === "boolean") {
      return "Boolean";
    }

    return undefined;
  }
}
