import { ParseJson } from "../parser/parser.service";
import { JSONStructure } from "../types/types";

export function generateNestJSCodeFromFilePath(filePath: string) {
  const parsedJson: JSONStructure = ParseJson(filePath);
  generateNestJSCode(parsedJson);
}

export function generateNestJSCode(JSONData: JSONStructure) {
  console.log(JSONData);
}
