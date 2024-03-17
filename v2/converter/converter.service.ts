import * as fs from "fs";

import {
  generateControllerMethod,
  generateController,
} from "./controller.generator";
import { generateServiceMethod, generateService } from "./service.generator";

export default function createModuleTemplateCode(module) {
  module.resources.forEach((resource) => {
    const controllerMethods: any = [];
    const serviceMethods: any = [];
    resource.endpoints.forEach((endpoint) => {
      const controllerMethod = generateControllerMethod(endpoint);
      const serviceMethod = generateServiceMethod(endpoint);
      controllerMethods.push(controllerMethod);
      serviceMethods.push(serviceMethod);
    });

    const controller = generateController(
      module.name,
      resource.moduleEndpoint,
      controllerMethods.join("\n")
    );
    const service = generateService(module.name, serviceMethods.join("\n"));

    const moduleFile = `import { Module } from '@nestjs/common';
import { ${
      module.name
    }Controller } from './${resource.moduleEndpoint.toLowerCase()}.controller';
import { ${
      module.name
    }Service } from './${resource.moduleEndpoint.toLowerCase()}.service';

@Module({
    controllers: [${module.name}Controller],
    providers: [${module.name}Service],
})
export class ${module.name}Module {}`;

    fs.mkdirSync(module.name, { recursive: true });
    writeToFile(
      `${module.name}/${resource.moduleEndpoint}.controller.ts`,
      controller
    );
    writeToFile(
      `${module.name}/${resource.moduleEndpoint}.module.ts`,
      moduleFile
    );
    writeToFile(
      `${module.name}/${resource.moduleEndpoint}.service.ts`,
      service
    );
  });
}

export function writeToFile(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error("Error writing Template: ", err);
    } else {
      console.log(`${filename} Template generated successfully!`);
    }
  });
}
