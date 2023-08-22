import * as xmljs from "xml-js";
import * as JSON5 from "../../js/json5";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class Json5ToXmlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.JSON5ToXml;
  }
  async convert(text: string): Promise<string> {
    const obj = JSON5.parse(text);

    return xmljs.js2xml(obj, { compact: true, spaces: 2 });
  }
}
