/* eslint-disable @typescript-eslint/naming-convention */
import { QuickPickItem } from "vscode";
import { Converter } from "./converter/converter";
import { Base64ToFileConverter } from "./converter/impl/base64-to-file.converter";
import { Base64ToHexConverter } from "./converter/impl/base64-to-hex.converter";
import { DecodeBase64Converter } from "./converter/impl/decode-base64.converter";
import { DecodeHexConverter } from "./converter/impl/decode-hex.converter";
import { DecodeUriComponentWithEucKrConverter } from "./converter/impl/decode-uri-component-with-euc-kr.converter";
import { DecodeUriComponentConverter } from "./converter/impl/decode-uri-component.converter";
import { DecryptAesCbcConverter } from "./converter/impl/decrypt-aes-cvc.converter";
import { EncodeBase64Converter } from "./converter/impl/encode-base64.converter";
import { EncodeHexConverter } from "./converter/impl/encode-hex.converter";
import { EncodeUriComponentConverter } from "./converter/impl/encode-uri-component.converter";
import { EncryptAesCbcConverter } from "./converter/impl/encrypt-aes-cvc.converter";
import { EscapeTextConverter } from "./converter/impl/escape-text.converter";
import { EvalJavascriptConverter } from "./converter/impl/eval-javascript.converter";
import { FilePathToBase64Converter } from "./converter/impl/file-path-to-base64.converter";
import { FilePathToHexConverter } from "./converter/impl/file-path-to-hex.converter";
import { FilePathToPlainTextConverter } from "./converter/impl/file-path-to-plain-text.converter";
import { HexToBase64Converter } from "./converter/impl/hex-to-base64.converter";
import { HexToFileConverter } from "./converter/impl/hex-to-file.converter";
import { HttpToCurlConverter } from "./converter/impl/http-to-curl.converter";
import { JsonStringifiedToPlainConverter } from "./converter/impl/json-stringified-to-plain.converter";
import { Json5ToParameterConverter } from "./converter/impl/json-to-parameter.converter";
import { Json5ToJsonConverter } from "./converter/impl/json5-to-json.converter";
import { Json5ToKotlinDataClassConverter } from "./converter/impl/json5-to-kotlin-data-class.converter";
import { Json5ToMongooseConverter } from "./converter/impl/json5-to-mongoose";
import { Json5ToMysqlDdlConverter } from "./converter/impl/json5-to-mysql-ddl.converter";
import { Json5ToNestjsDtoConverter } from "./converter/impl/json5-to-nestjs-dto";
import { Json5ToTypeScriptClassConverter } from "./converter/impl/json5-to-typescript-class.converter";
import { Json5ToTypescriptInterfaceConverter } from "./converter/impl/json5-to-typescript-interface.converter";
import { Json5ToXmlConverter } from "./converter/impl/json5-to-xml.converter";
import { Json5ToYamlConverter } from "./converter/impl/json5-to-yaml.converter";
import { MaskYyyyMMDdConverter } from "./converter/impl/mask-yyyy-MM-dd.converter";
import { ParameterToJsonConverter } from "./converter/impl/parameter-to-json.converter";
import { PrettyJsonConverter } from "./converter/impl/pretty-json.converter";
import { PrettyXmlConverter } from "./converter/impl/pretty-xml.converter";
import { RemoveLineBreakAndSpaceConverter } from "./converter/impl/remove-line-break-and-space.converter";
import { RemoveLineBreakConverter } from "./converter/impl/remove-line-break.converter";
import { Sha256Converter } from "./converter/impl/sha-256.converter";
import { Sha512Converter } from "./converter/impl/sha-512.converter";
import { ToCamelCaseConverter } from "./converter/impl/to-camel-case.converter";
import { ToKebabCaseConverter } from "./converter/impl/to-kebab-case.converter";
import { ToLowerCaseConverter } from "./converter/impl/to-lowercase-converter";
import { ToPascalCaseConverter } from "./converter/impl/to-pascal-case.converter";
import { ToSnakeCaseConverter } from "./converter/impl/to-snake-case.converter";
import { ToUpperCaseConverter } from "./converter/impl/to-uppercase-converter";
import { UnescapeHtmlConverter } from "./converter/impl/unescape-html.converter";
import { UnescapeTextConverter } from "./converter/impl/unescape-text.converter";
import { XmlToJsonConverter } from "./converter/impl/xml-to-json.converter";
import { YamlToJsonConverter } from "./converter/impl/yaml-to-json.converter";

export const EXTENSION_NAME = "converter";
export const DEFAULT_ERROR_MESSAGE =
  "Failed to convert.\nPlease check the input value.";

export const COMMAND = {
  EncodeBase64: "encode-base64",
  DecodeBase64: "decode-base64",
  EncodeHex: "encode-hex",
  DecodeHex: "decode-hex",
  HexToBase64: "hex-to-base64",
  Base64ToHex: "base64-to-hex",
  ToUpperCase: "to-upper-case",
  ToLowerCase: "to-lower-case",
  MaskYyyyMMDd: "mask-yyyy-MM-dd",
  SHA256: "hash-sha-256",
  SHA512: "hash-sha-512",
  PrettyJson: "pretty-json",
  PrettyXml: "pretty-xml",
  PrettyHtml: "pretty-html",
  PrettyJavaScript: "pretty-javascript",
  PrettyTypeScript: "pretty-typescript",
  Json5ToParameter: "json5-to-parameter",
  ParameterToJson: "parameter-to-json",
  EncodeUriComponent: "encode-uri-component",
  DecodeUriComponent: "decode-uri-component",
  DecodeUriComponentWithEucKr: "decode-uri-component-with-euc-kr",
  HTTPToCurl: "http-to-curl",
  JSON5ToJson: "json5-to-json",
  JSON5ToTypeScriptInterface: "json5-to-typescript-interface",
  JSON5ToTypeScriptClass: "json5-to-typescript-class",
  XmlToJson: "xml-to-json",
  JSON5ToXml: "json5-to-xml",
  EncryptAesCbc: "encrypt-aes-cbc",
  DecryptAesCbc: "decrypt-aes-cbc",
  UnescapeText: "escape-to-plain",
  EscapeText: "plain-to-escape",
  JsonStringifiedToPlain: "json-stringified-to-plain",
  Json5ToKotlinDataClass: "json5-to-kotlin-data-class",
  Json5ToMysqlDdl: "json5-to-mysql-ddl",
  Json5ToMongoose: "json5-to-mongoose",
  Json5ToYaml: "json5-to-yaml",
  YamlToJson: "yaml-to-json",
  FilePathToPlainText: "file-path-to-plain-text",
  FilePathToBase64: "file-path-to-base64",
  FilePathToHex: "file-path-to-hex",
  RemoveLineBreak: "remove-line",
  RemoveLineBreakAndSpace: "remove-space-and-line",
  UnescapeHtml: "unescape-html",
  EvalJavascript: "eval-javascript",
  Base64ToFile: "base64-to-file",
  HexToFile: "hex-to-file",
  JSON5ToNestjsDto: "json5-to-nestjs-dto",
  ToCamelCase: "to-camel-case",
  ToSnakeCase: "to-snake-case",
  ToPascalCase: "to-pascal-case",
  ToKebabCase: "to-kebab-case",
} as const;

export const COMMAND_HANDLERS: (QuickPickItem & {
  id: (typeof COMMAND)[keyof typeof COMMAND];
  converter: Converter;
})[] = [
  {
    id: COMMAND.EncodeBase64,
    label: "Encode Base64",
    converter: new EncodeBase64Converter(),
  },
  {
    id: COMMAND.DecodeBase64,
    label: "Decode Base64",
    converter: new DecodeBase64Converter(),
  },
  {
    id: COMMAND.EncodeHex,
    label: "Encode Hex",
    converter: new EncodeHexConverter(),
  },
  {
    id: COMMAND.DecodeHex,
    label: "Decode Hex",
    converter: new DecodeHexConverter(),
  },
  {
    id: COMMAND.SHA256,
    label: "Hash SHA256",
    converter: new Sha256Converter(),
  },
  {
    id: COMMAND.SHA512,
    label: "Hash SHA512",
    converter: new Sha512Converter(),
  },
  {
    id: COMMAND.Base64ToHex,
    label: "Convert Base64 to Hex",
    converter: new Base64ToHexConverter(),
  },
  {
    id: COMMAND.HexToBase64,
    label: "Convert Hex to Base64",
    converter: new HexToBase64Converter(),
  },
  {
    id: COMMAND.ToUpperCase,
    label: "Convert to UpperCase",
    converter: new ToUpperCaseConverter(),
  },
  {
    id: COMMAND.ToLowerCase,
    label: "Convert to LowerCase",
    converter: new ToLowerCaseConverter(),
  },
  {
    id: COMMAND.MaskYyyyMMDd,
    label: "Mask yyyyMMdd",
    converter: new MaskYyyyMMDdConverter(),
  },
  {
    id: COMMAND.PrettyJson,
    label: "Prettify / Beautify JSON",
    converter: new PrettyJsonConverter(),
  },
  {
    id: COMMAND.PrettyXml,
    label: "Prettify / Beautify XML",
    converter: new PrettyXmlConverter(),
  },
  /*
  Prettier 를 사용하는 Converter 를 추가하면, 패키지 사이즈가 너무 커지고 빌드가 오래걸림
  {
    id: COMMAND.PrettyHtml,
    label: "Prettify / Beautify HTML",
    converter: new PrettyHtmlConverter(),
  },
  {
    id: COMMAND.PrettyJavaScript,
    label: "Prettify / Beautify JavaScript",
    converter: new PrettyJavaScriptConverter(),
  },
  {
    id: COMMAND.PrettyTypeScript,
    label: "Prettify / Beautify TypeScript",
    converter: new PrettyTypeScriptConverter(),
  },
  */
  {
    id: COMMAND.Json5ToParameter,
    label: "Convert JSON to form-url-encoded",
    converter: new Json5ToParameterConverter(),
  },
  {
    id: COMMAND.ParameterToJson,
    label: "Convert form-url-encoded to JSON",
    converter: new ParameterToJsonConverter(),
  },
  {
    id: COMMAND.EncodeUriComponent,
    label: "Encode URI Component",
    converter: new EncodeUriComponentConverter(),
  },
  {
    id: COMMAND.DecodeUriComponent,
    label: "Decode URI Component",
    converter: new DecodeUriComponentConverter(),
  },
  {
    id: COMMAND.DecodeUriComponentWithEucKr,
    label: "Decode URI Component With EUC-KR Encoding",
    converter: new DecodeUriComponentWithEucKrConverter(),
  },
  {
    id: COMMAND.HTTPToCurl,
    label: "Convert HTTP to Curl",
    converter: new HttpToCurlConverter(),
  },
  {
    id: COMMAND.JSON5ToJson,
    label: "Convert JSON5 To JSON",
    converter: new Json5ToJsonConverter(),
  },
  {
    id: COMMAND.JSON5ToTypeScriptInterface,
    label: "Convert JSON5 To TypeScript Interface",
    converter: new Json5ToTypescriptInterfaceConverter(),
  },
  {
    id: COMMAND.JSON5ToTypeScriptClass,
    label: "Convert JSON5 To TypeScript Class",
    converter: new Json5ToTypeScriptClassConverter(),
  },
  {
    id: COMMAND.JSON5ToXml,
    label: "Convert JSON5 To XML",
    converter: new Json5ToXmlConverter(),
  },
  {
    id: COMMAND.XmlToJson,
    label: "Convert XML To Json",
    converter: new XmlToJsonConverter(),
  },
  {
    id: COMMAND.EncryptAesCbc,
    label: "Encrypt AES-CBC",
    converter: new EncryptAesCbcConverter(),
  },
  {
    id: COMMAND.DecryptAesCbc,
    label: "Decrypt AES-CBC",
    converter: new DecryptAesCbcConverter(),
  },
  {
    id: COMMAND.UnescapeText,
    label: "Unescape Text",
    converter: new UnescapeTextConverter(),
  },
  {
    id: COMMAND.EscapeText,
    label: "Escape Text",
    converter: new EscapeTextConverter(),
  },
  {
    id: COMMAND.JsonStringifiedToPlain,
    label: "Convert JSON Stringified To Plain",
    converter: new JsonStringifiedToPlainConverter(),
  },
  {
    id: COMMAND.Json5ToKotlinDataClass,
    label: "Convert JSON5 To Kotlin Data Class",
    converter: new Json5ToKotlinDataClassConverter(),
  },
  {
    id: COMMAND.Json5ToMysqlDdl,
    label: "Convert JSON5 To Mysql DDL",
    converter: new Json5ToMysqlDdlConverter(),
  },
  {
    id: COMMAND.Json5ToMongoose,
    label: "Convert JSON5 To Mongoose Schema",
    converter: new Json5ToMongooseConverter(),
  },
  {
    id: COMMAND.Json5ToYaml,
    label: "Convert JSON5 To YAML",
    converter: new Json5ToYamlConverter(),
  },
  {
    id: COMMAND.YamlToJson,
    label: "Convert YAML To JSON",
    converter: new YamlToJsonConverter(),
  },
  {
    id: COMMAND.FilePathToPlainText,
    label: "Convert File Path To Plain Text",
    converter: new FilePathToPlainTextConverter(),
  },
  {
    id: COMMAND.FilePathToBase64,
    label: "Convert File Path To Base64",
    converter: new FilePathToBase64Converter(),
  },
  {
    id: COMMAND.FilePathToHex,
    label: "Convert File Path To Hex",
    converter: new FilePathToHexConverter(),
  },
  {
    id: COMMAND.RemoveLineBreak,
    label: "Remove Line Break",
    converter: new RemoveLineBreakConverter(),
  },
  {
    id: COMMAND.RemoveLineBreakAndSpace,
    label: "Remove Line Break And Space",
    converter: new RemoveLineBreakAndSpaceConverter(),
  },
  {
    id: COMMAND.UnescapeHtml,
    label: "Unescape HTML",
    converter: new UnescapeHtmlConverter(),
  },
  {
    id: COMMAND.EvalJavascript,
    label: "Eval Javascript",
    converter: new EvalJavascriptConverter(),
  },
  {
    id: COMMAND.Base64ToFile,
    label: "Save Base64 To File",
    converter: new Base64ToFileConverter(),
  },
  {
    id: COMMAND.HexToFile,
    label: "Save Hex To File",
    converter: new HexToFileConverter(),
  },
  {
    id: COMMAND.JSON5ToNestjsDto,
    label: "Convert JSON5 to Nestjs DTO",
    converter: new Json5ToNestjsDtoConverter(),
  },
  {
    id: COMMAND.ToCamelCase,
    label: "Convert to Camel Case",
    converter: new ToCamelCaseConverter(),
  },
  {
    id: COMMAND.ToSnakeCase,
    label: "Convert to Snake Case",
    converter: new ToSnakeCaseConverter(),
  },
  {
    id: COMMAND.ToPascalCase,
    label: "Convert to Pascal Case",
    converter: new ToPascalCaseConverter(),
  },
  {
    id: COMMAND.ToKebabCase,
    label: "Convert to Kebab Case",
    converter: new ToKebabCaseConverter(),
  },
];
