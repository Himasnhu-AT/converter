import { Endpoint } from "../../../types/types";

export function generateServiceMethod(endpoint: Endpoint): string {
  var output: string = "";
  output += `\nasync ${endpoint.function}() {`;
  output += `    try {`;
  output += businessLogicSkeleton(endpoint);
  output += `    } catch(e) {`;
  output += `      console.error(\`Failed ${endpoint.function} Server Error 500:\`);`;
  output += `      console.error(e);`;
  output += `    }`;
  output += `  }`;
  return output;
}

function businessLogicSkeleton(endpoint: Endpoint): string {
  var output: string = "";
  output += `
    ${businessLogic(endpoint)}`;
  return output;
}

function businessLogic(endpoint: Endpoint): string {
  var output: string = "";
  output += ` return this.prisma.${endpoint.return[
    "200"
  ].data.prisma.model.toLowerCase()}.${
    endpoint.return["200"].data.prisma.action
  }({`;

  // if (endpoint.return["200"].data.prisma.args.select!) {
  //   output += `
  //   select: ${JSON.stringify(endpoint.return["200"].data.prisma.args.select!)},`;
  // }

  // if (endpoint.return["200"].data.prisma.args.include.length > 0) {
  //   output += `
  //   include: ${JSON.stringify(
  //     endpoint.return["200"].data.prisma.args.include
  //   )},`;
  // }

  // if (endpoint.return["200"].data.prisma.args.skip > 0) {
  //   output += `
  //   skip: ${endpoint.return["200"].data.prisma.args.skip},`;
  // }

  // if (endpoint.return["200"].data.prisma.args.take > 0) {
  //   output += `
  //   take: ${endpoint.return["200"].data.prisma.args.take},`;
  // }

  // if (endpoint.return["200"].data.prisma.args.orderBy) {
  //   output += `
  //   orderBy: ${JSON.stringify(
  //     endpoint.return["200"].data.prisma.args.orderBy
  //   )},`;
  // }

  // if (endpoint.return["200"].data.prisma.args.where.length > 0) {
  //   output += `
  //   where: ${JSON.stringify(endpoint.return["200"].data.prisma.args.where)},`;
  // }

  output += `
  });`;
  return output;
}
