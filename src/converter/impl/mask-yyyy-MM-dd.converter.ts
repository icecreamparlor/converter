import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class MaskYyyyMMDdConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.MaskYyyyMMDd;
  }
  async convert(text: string): Promise<string> {
    const regexes = [
      /(19\d{2}|20[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])/g,
      /(19\d{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/g,
    ];

    return regexes.reduce(
      (ac, regex) =>
        ac.replace(regex, (match, yyyy, MM, dd) => match.replace(MM, "**")),
      text
    );
  }
}
