import * as forge from "node-forge";
import * as vscode from "vscode";

import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class EncryptAesCbcConverter implements Converter {
  private readonly _keySizes = [16, 24, 32];
  private readonly _ivSize = [16];

  shouldHandle(command: string) {
    return command === COMMAND.EncryptAesCbc;
  }
  async convert(text: string): Promise<string> {
    const { key, iv } = await this.getKeyIv();

    const cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({ iv: forge.util.createBuffer(iv) });
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(text)));

    if (!cipher.finish()) {
      throw new Error("AES-CBC Encryption failed");
    }

    return cipher.output.toHex();
  }

  private async getKeyIv() {
    const key = await vscode.window.showInputBox({
      placeHolder: "Enter Key (16 / 24 / 32 bytes)",
      prompt: "Enter Key (16 / 24 / 32 bytes)",
    });
    if (!key) {
      throw new Error("Encrypt Key is required");
    }
    if (!this._keySizes.includes(key.length)) {
      throw new Error("Key length must be 16, 24 or 32 bytes");
    }
    const iv = await vscode.window.showInputBox({
      placeHolder: "Enter IV (16 bytes)",
      prompt: "Enter IV (16 bytes)",
    });
    if (!iv) {
      throw new Error("Initial Vector is required");
    }
    if (!this._ivSize.includes(iv.length)) {
      throw new Error("IV length must be 16 bytes");
    }

    return { key, iv };
  }
}
