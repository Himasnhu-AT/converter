import * as fs from "fs";
import { JSONStructure } from "../types/types";

export function ParseJson(filePath: string): JSONStructure {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    throw new Error("Can't parse JSON." + e);
  }
}
