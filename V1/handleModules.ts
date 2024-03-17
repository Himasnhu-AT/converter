import { Module } from "./types";
import { CreateModuleTemplateCode } from "./module.template";

export function HandleModules(moduleData: Module) {
  //   console.log("\n\nModules Are Present Here:   \n", moduleData);
  console.log("Module Parsed ");
  CreateModuleTemplateCode(moduleData);
}
