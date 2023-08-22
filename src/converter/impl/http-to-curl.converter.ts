import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class HttpToCurlConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.HTTPToCurl;
  }
  async convert(httpText: string): Promise<string> {
    const lines = httpText.split("\n");
    let curlCommand = "curl";

    const hostRegex = /[Hh]ost: (.+)\n/;
    const host = httpText.match(hostRegex)?.[1];
    if (!host) {
      return httpText;
    }

    // 첫 번째 줄은 HTTP 메서드와 URL
    const [method, url] = lines[0].split(" ");
    curlCommand += ` -X ${method} 'http://${host}${url}' \\\n`;

    // 헤더 설정
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") {
        // 빈 줄을 만나면 헤더 설정 종료
        break;
      }
      curlCommand += ` -H '${line}' \\\n`;
    }

    // 바디 설정
    const bodyIndex = lines.findIndex((line) => line.trim() === "") + 1;
    if (bodyIndex < lines.length) {
      const body = lines.slice(bodyIndex).join("\n");
      curlCommand += ` -d '${body}'`;
    }

    return curlCommand;
  }
}
