import * as fs from "fs";
import { Module } from "./types";

export function CreateModuleTemplateCode(module: Module) {
  const Controller = `import { Controller } from '@nestjs/common';
    import { ${
      module.name
    }Service } from './${module.name.toLowerCase()}.service';
    
    @Controller('${module.resources[0].moduleEndpoint}')
    export class ${module.name}Controller {
      constructor(private readonly ${module.name.toLowerCase()}Service: ${
    module.name
  }Service) {}
    
      @Get()
      getHello(): string {
        return this.${module.name.toLowerCase()}Service.getHello();
      }
    }
    `;

  const Module = `import { Module } from '@nestjs/common';
    import { ${
      module.name
    }Controller } from './${module.name.toLowerCase()}.controller';
    import { ${
      module.name
    }Service } from './${module.name.toLowerCase()}.service';
    
    @Module({
      imports: [],
      controllers: [${module.name}Controller],
      providers: [${module.name}Service],
    })
    export class ${module.name}Module {}
    `;

  const Service = `import { Injectable } from '@nestjs/common';
    
    @Injectable()
    export class ${module.name}Service {
      getHello(): string {
        return 'Hello World!';
      }
    }
    `;

  fs.mkdirSync(`${module.name}`, { recursive: true });
  WriteToFile(`${module.name}/${module.name}.controller.ts`, Controller);
  WriteToFile(`${module.name}/${module.name}.module.ts`, Module);
  WriteToFile(`${module.name}/${module.name}.service.ts`, Service);
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
