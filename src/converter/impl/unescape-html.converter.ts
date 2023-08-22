/* eslint-disable @typescript-eslint/naming-convention */
import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class UnescapeHtmlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.UnescapeHtml;
  }
  async convert(text: string): Promise<string> {
    const escapeMap = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
      "&#x2F;": "/",
      "&#x60;": "`",
      "&#x3D;": "=",
      // 기타 필요한 이스케이프 문자에 대한 매핑 추가 가능
    };

    return text.replace(
      /&(amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/g,
      (match, entity) => {
        return escapeMap[match as keyof typeof escapeMap];
      }
    );
  }
}
