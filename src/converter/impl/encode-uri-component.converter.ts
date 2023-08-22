import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class EncodeUriComponentConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.EncodeUriComponent;
  }
  async convert(text: string): Promise<string> {
    return encodeURIComponent(text);
  }
}
