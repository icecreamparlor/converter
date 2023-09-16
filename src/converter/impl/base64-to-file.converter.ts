import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";
import { COMMAND } from "../../settings";
import { die } from "../../util";
import { Converter } from "../converter";

export class Base64ToFileConverter implements Converter {
  shouldHandle(command: string): boolean {
    return command === COMMAND.Base64ToFile;
  }
  async convert(text: string): Promise<string> {
    const path =
      (await vscode.window.showInputBox({
        placeHolder: "Enter path to save file",
        prompt: "Enter path to save file",
        value: this.getDefaultFilePath(),
      })) ?? die(new Error("Path is required"));

    const filePath = this.convertFilePath(path);

    fs.writeFile(filePath, Buffer.from(text, "base64"), () => {
      vscode.window.showInformationMessage(`File saved to ${filePath}`);
    });

    return filePath;
  }

  private getDefaultFilePath(): string {
    if (vscode.workspace.workspaceFolders !== undefined) {
      const workspacePath = vscode.workspace.workspaceFolders[0].uri.path;

      return workspacePath;
    } else {
      return "";
    }
  }

  private convertFilePath(text: string): string {
    if (text === "") {
      throw new Error("Path is required");
    }
    if (text.startsWith("/")) {
      return text;
    }
    if (text.startsWith(".")) {
      const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
      const workspacePath = workspaceFolders[0].uri.path;
      const filePath = path.resolve(workspacePath, text);

      return filePath;
    }

    if (text.startsWith("~")) {
      const homeDir = os.homedir();
      const filePath = path.resolve(homeDir, text.replace("~", "."));

      return filePath;
    }

    // Consider as Relative Path
    const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
    const workspacePath = workspaceFolders[0].uri.path;
    const filePath = path.resolve(workspacePath, text);

    return filePath;
  }
}
