import { HandleModules } from "./handleModules";
import { JSONStructure } from "./types";

export function ConvertJsonToNest(JsonData: JSONStructure) {
  JsonData.modules.forEach((module) => {
    HandleModules(module);
  });
}
