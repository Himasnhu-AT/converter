import * as fs from "fs";
import { Module, Resource, Endpoint } from "./types";

export function CreateModuleTemplateCode(module: Module) {
  module.resources.forEach((resource) => {
    const controllerMethods: string[] = [];
    const serviceMethods: string[] = [];
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
export class ${module.name}Module {}
`;

    fs.mkdirSync(`${module.name}`, { recursive: true });
    WriteToFile(
      `${module.name}/${resource.moduleEndpoint}.controller.ts`,
      controller
    );
    WriteToFile(
      `${module.name}/${resource.moduleEndpoint}.module.ts`,
      moduleFile
    );
    WriteToFile(
      `${module.name}/${resource.moduleEndpoint}.service.ts`,
      service
    );
  });
}

function generateControllerMethod(endpoint: Endpoint): string {
  let method = `  @${endpoint.methods[0]}('${endpoint.path}')\n`;
  method += `  async ${endpoint.function}() {\n`;
  method += `    return await this.controllerService.${endpoint.function}();\n`;
  method += `  }\n`;
  return method;
}

function generateController(
  moduleName: string,
  endpoint: string,
  methods: string
): string {
  return `import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
  import { ${moduleName}Service } from './${endpoint.toLowerCase()}.service';
  
@Controller('${endpoint}')
export class ${moduleName}Controller {
    constructor(private readonly controllerService: ${moduleName}Service) {}
${methods}
}
`;
}

function generateServiceMethod(endpoint: Endpoint): string {
  return `\nasync ${endpoint.function}() {
  try {
    ${
      endpoint.return[200]?.data
        ? `return await this.prisma.${
            endpoint.return[200].data!.prisma.model
          }.${endpoint.return[200].data?.prisma.action}({})`
        : ""
    }
  } catch(e) {
    console.error(\`Failed ${endpoint.function} Server Error 500:\`);
    console.error(e);
  }
}`;
}

function generateService(moduleName: string, methods: string): string {
  return `import { Injectable } from '@nestjs/common';
  
@Injectable()
export class ${moduleName}Service {
    constructor(private readonly prisma: PrismaService) {}
${methods}
}
`;
}

function WriteToFile(filename: string, data: string) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error("Error writing Template: ", err);
    } else {
      console.log(`${filename} Template generated successfully!`);
    }
  });
}
