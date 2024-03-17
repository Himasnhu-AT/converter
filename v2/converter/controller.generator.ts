export function generateControllerMethod(endpoint) {
  let method = `  @${endpoint.methods[0]}('${endpoint.path}')\n`;
  method += `  async ${endpoint.function}() {\n`;
  method += `    return await this.controllerService.${endpoint.function}();\n`;
  method += `  }\n`;
  return method;
}

// Function to generate controller code
export function generateController(moduleName, endpoint, methods) {
  return `import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
  import { ${moduleName}Service } from './${endpoint.toLowerCase()}.service';
    
  @Controller('${endpoint}')
  export class ${moduleName}Controller {
      constructor(private readonly controllerService: ${moduleName}Service) {}
  ${methods}
  }`;
}
