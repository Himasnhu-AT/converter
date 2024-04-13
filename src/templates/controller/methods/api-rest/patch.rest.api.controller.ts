export function PatchRestApiMethodImpl(
  endpoint: string,
  functionName: string,
  Headers?: string,
  Params?: string,
  Body?: string,
  Query?: string,
  Response?: string
): string {
  var output: string = "";
  output += `@Patch('${endpoint}')`;
  output += ` async ${functionName}(`;
  output += `    ${Headers ? `@Headers() headers: ${Headers},` : ""}`;
  output += `   ${Params ? `@Params() params: ${Params},` : ""}`;
  output += `     ${Body ? `@Body() body: ${Body},` : ""}`;
  output += `     ${Query ? `@Query() query: ${Query},` : ""}`;
  output += `     ${Response ? `@Response() response: ${Response},` : ""}`;
  output += ` ) {`;
  output += `     return await this.controllerService.${functionName}();`;
  output += ` } `;

  return output;
}
