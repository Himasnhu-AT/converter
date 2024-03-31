import * as fs from "fs";
import { JSONStructure } from "../types/types";

export function ParseJson(filePath: string): JSONStructure | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    return null;
  }
}
