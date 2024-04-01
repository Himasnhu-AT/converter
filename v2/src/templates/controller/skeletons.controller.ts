/**
 * Generates the skeleton code for a controller class.
 *
 * @param moduleName - The name of the module.
 * @param methods - The methods to be included in the controller.
 * @returns The generated controller code.
 */
export function SkeletonController(
  moduleName: string,
  methods: string
): string {
  return `import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    Post,
    Res,
    UseGuards,
  } from '@nestjs/common';
import { ${moduleName}Service } from './${moduleName.toLowerCase()}.service';

@Controller('${moduleName}')
export class ${moduleName}Controller {
    constructor(private readonly controllerService: ${moduleName}Service) {}
${methods}
}
`;
}
