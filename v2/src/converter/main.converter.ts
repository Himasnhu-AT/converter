import { ParseJson } from "../parser/parser.service";
import { ApiRestRequest } from "../templates/controller/methods/api-rest/middleware";
import { SkeletonController } from "../templates/controller/skeletons.controller";
import { SimpleModule } from "../templates/modules/simple.module";
import { JSONStructure } from "../types/types";
import { WriteToFile } from "./writeToFile.converter";

export function generateNestJSCodeFromFilePath(filePath: string) {
  const parsedJson: JSONStructure = ParseJson(filePath);
  generateNestJSCode(parsedJson);
}

export function generateNestJSCode(JSONData: JSONStructure) {
  JSONData.modules.forEach((module) => {
    var controllerCode: string = "";
    var controllerMethodCode: string = "";
    var serviceCode: string = "";
    var serviceMethodCode: string = "";
    var moduleCode: string = SimpleModule(module.name, module.endpoint);

    console.warn("MODULE CODE: " + moduleCode + "\n\n\n\n\n");
    // WriteToFile(
    //   `./${module.name}.${module.name.toLowerCase()}/module.ts`,
    //   moduleCode
    // );

    module.endpoints.forEach((endpoint) => {
      controllerMethodCode += ApiRestRequest(
        endpoint.methods,
        endpoint.path,
        endpoint.function
      );

      // TODO implement service method too
    });

    controllerCode = SkeletonController(module.name, controllerMethodCode);
    console.warn("CONTROLLER CODE: " + controllerCode + "\n\n\n\n");
  });
}
