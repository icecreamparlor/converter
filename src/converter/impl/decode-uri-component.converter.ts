import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class DecodeUriComponentConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.DecodeUriComponent;
  }
  async convert(text: string): Promise<string> {
    return decodeURIComponent(text);
  }
}
