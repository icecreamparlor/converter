import * as xmljs from "xml-js";
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class XmlToJsonConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.XmlToJson;
  }
  async convert(text: string): Promise<string> {
    return xmljs.xml2json(text, { compact: true, spaces: 2 });
  }
}
