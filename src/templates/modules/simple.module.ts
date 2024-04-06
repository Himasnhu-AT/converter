export function SimpleModule(moduleName: string) {
  return `import { Module } from '@nestjs/common';
import { ${moduleName}Controller } from './${moduleName.toLowerCase()}.controller';
import { ${moduleName}Service } from './${moduleName.toLowerCase()}.service';

@Module({
    controllers: [${moduleName}Controller],
    providers: [${moduleName}Service],
})
export class ${moduleName}Module {}
`;
}
