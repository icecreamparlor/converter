import * as xmlParser from "xml-js";
import { COMMAND } from "../../settings";

import { Converter } from "../converter";

export class PrettyXmlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.PrettyXml;
  }
  async convert(text: string): Promise<string> {
    // XML 파싱
    const options = {
      spaces: 2,
      ignoreComment: true,
      ignoreDoctype: true,
    };
    const parsedXml = xmlParser.xml2js(text, options);

    // 포맷팅된 XML 문자열 생성
    return xmlParser.js2xml(parsedXml, options);
  }
}
