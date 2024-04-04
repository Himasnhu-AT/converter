export function SkeletonService(moduleName: string, method: string) {
  return `import { Inject, Injectable } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ${moduleName}Service {
    constructor(
        private prisma: PrismaService,
      ) {}
    ${method}
}
`;
}
