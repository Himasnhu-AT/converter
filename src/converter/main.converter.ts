import { ParseJson } from "../parser/parser.service";
import { ApiRestRequest } from "../templates/controller/methods/api-rest/middleware";
import { SkeletonController } from "../templates/controller/skeletons.controller";
import { SimpleModule } from "../templates/modules/simple.module";
import { getPrismaModuleTemplate } from "../templates/prisma/prisma.module";
import { getPrismaServiceTemplate } from "../templates/prisma/prisma.service";
import { generateServiceMethod } from "../templates/services/methods/service.methods";
import { SkeletonService } from "../templates/services/skeletons.services";
import { JSONStructure } from "../types/types";
import { WriteToFile } from "./writeToFile.converter";

export function generateNestJSCodeFromFilePath(filePath: string) {
  const parsedJson: JSONStructure = ParseJson(filePath);
  generateNestJSCode(parsedJson);
}

export function generateNestJSCode(JSONData: JSONStructure) {
  JSONData.modules.forEach(async (module) => {
    var controllerCode: string = "";
    var controllerMethodCode: string = "";
    var serviceCode: string = "";
    var serviceMethodCode: string = "";
    var moduleCode: string = SimpleModule(module.name);

    WriteToFile(
      `prisma`,
      `./prisma/prisma.module.ts`,
      getPrismaModuleTemplate()
    );
    WriteToFile(
      `prisma`,
      `./prisma/prisma.service.ts`,
      getPrismaServiceTemplate()
    );
    console.log("Generate Prisma Client ts file");

    console.log("Module generated");
    WriteToFile(
      `${module.name}`,
      `./${module.name}/${module.name.toLowerCase()}.module.ts`,
      moduleCode
    );

    module.endpoints.forEach(async (endpoint) => {
      controllerMethodCode += ApiRestRequest(
        endpoint.methods,
        endpoint.path,
        endpoint.function
      );

      serviceMethodCode += generateServiceMethod(endpoint);

      // TODO implement service method too
    });

    controllerCode = SkeletonController(module.name, controllerMethodCode);
    serviceCode = SkeletonService(module.name, serviceMethodCode);
    console.log("Controller generated");
    console.log("Service generated");
    WriteToFile(
      `./${module.name}`,
      `./${module.name}/${module.name.toLowerCase()}.controller.ts`,
      controllerCode
    );
    WriteToFile(
      `./${module.name}`,
      `./${module.name}/${module.name.toLowerCase()}.service.ts`,
      serviceCode
    );
  });
}
