/**
 * A converter that converts text
 */
export interface Converter {
  /**
   * Determines if the converter should handle the command
   * @param command - The command to handle
   */
  shouldHandle(command: string): boolean;
  /**
   * Converts the text
   * @param text - The text to convert
   */
  convert(text: string): Promise<string>;
  /**
   * Called when an error occurs
   * @param error - The error that occurred
   */
  onError?(error: Error): void;
}
