import * as vscode from "vscode";
import { convert } from "./convert";
import { EXTENSION_NAME } from "./settings";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    `${EXTENSION_NAME}.convert`,
    convert
  );

  context.subscriptions.push(disposable);
  vscode.window.showInformationMessage(`${EXTENSION_NAME} is activated`);
}

export function deactivate() {
  vscode.window.showInformationMessage(`${EXTENSION_NAME} is deactivated`);
}
