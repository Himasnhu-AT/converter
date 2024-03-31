export function SimpleModule(moduleName: string, moduleEndpoint: string) {
  return `import { Module } from '@nestjs/common';
import { ${moduleName}Controller } from './${moduleEndpoint.toLowerCase()}.controller';
import { ${moduleName}Service } from './${moduleEndpoint.toLowerCase()}.service';

@Module({
    controllers: [${moduleName}Controller],
    providers: [${moduleName}Service],
})
export class ${moduleName}Module {}
`;
}
