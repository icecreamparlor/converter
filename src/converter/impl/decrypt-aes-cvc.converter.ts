import * as forge from "node-forge";
import * as vscode from "vscode";

import { COMMAND } from "../../settings";
import { Converter } from "../converter";

export class DecryptAesCbcConverter implements Converter {
  private readonly _keySizes = [16, 24, 32];
  private readonly _ivSize = [16];

  shouldHandle(command: string) {
    return command === COMMAND.DecryptAesCbc;
  }
  async convert(encrypted: string): Promise<string> {
    const buffer = new forge.util.ByteStringBuffer(
      forge.util.hexToBytes(encrypted)
    );

    const { key, iv } = await this.getKeyIv();

    const decipher = forge.cipher.createDecipher("AES-CBC", key);
    decipher.start({ iv: forge.util.createBuffer(iv) });
    decipher.update(forge.util.createBuffer(buffer));

    if (!decipher.finish()) {
      throw new Error("AES-CBC Decryption failed");
    }

    return forge.util.decodeUtf8(decipher.output.data);
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
