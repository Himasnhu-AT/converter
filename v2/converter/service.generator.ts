export function generateServiceMethod(endpoint) {
  return `\nasync ${endpoint.function}() {
    try {
      return await this.prisma.${endpoint.return["200"].data!.prisma.model}.${
    endpoint.return["200"].data?.prisma.action
  }({
        select: ${JSON.stringify(
          endpoint.return["200"].data?.prisma.args.select
        )},
        include: ${JSON.stringify(
          endpoint.return["200"].data?.prisma.args.include
        )},
        skip: ${endpoint.return["200"].data?.prisma.args.skip || 0},
        take: ${endpoint.return["200"].data?.prisma.args.take || 10},
        orderBy: ${JSON.stringify(
          endpoint.return["200"].data?.prisma.args.orderBy
        )},
        where: ${JSON.stringify(endpoint.return["200"].data?.prisma.args.where)}
      });
    } catch(e) {
      console.error(\`Failed ${endpoint.function} Server Error 500:\`);
      console.error(e);
    }
  }`;
}

// Function to generate service code
export function generateService(moduleName, methods) {
  return `import { Injectable } from '@nestjs/common';
    
  @Injectable()
  export class ${moduleName}Service {
      constructor(private readonly prisma: PrismaService) {}
  ${methods}
  }`;
}
