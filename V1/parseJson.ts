import { ConvertJsonToNest } from "./converter";
import { JSONStructure } from "./types";

export function parseJson(filepath: string) {
  try {
    const fs = require("fs");
    const data = fs.readFileSync(filepath, "utf8");

    try {
      const jsonData: JSONStructure = JSON.parse(data);
      console.log("JSON parsed successfully");
      ConvertJsonToNest(jsonData);
    } catch (e) {
      console.error("Error parsing JSON: ", e);
      return null;
    }
  } catch (e) {
    console.error("Error reading file: ", e);
    return null;
  }
}
