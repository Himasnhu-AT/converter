export function PatchRestApiMethodImpl(
  endpoint: string,
  functionName: string,
  Headers?: string,
  Params?: string,
  Body?: string,
  Query?: string,
  Response?: string
): string {
  return `@Patch('${endpoint}')
    async ${functionName}(
        ${Headers ? `@Headers() headers: ${Headers},` : ""}
        ${Params ? `@Params() params: ${Params},` : ""}
        ${Body ? `@Body() body: ${Body},` : ""}
        ${Query ? `@Query() query: ${Query},` : ""}
        ${Response ? `@Response() response: ${Response},` : ""}
    ) {
        return await this.controllerService.${functionName}();
    }
    `;
}
