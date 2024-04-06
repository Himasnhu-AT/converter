import { DeleteRestApiMethodImpl } from "./delete.rest.api.controller";
import { GetRestApiMethodImpl } from "./get.rest.api.controller";
import { PatchRestApiMethodImpl } from "./patch.rest.api.controller";
import { GetPostApiMethod } from "./post.rest.api.controller";
import { PutRestApiMethodImpl } from "./put.rest.api.controller";

export function ApiRestRequest(
  method: string,
  endpoint: string,
  functionName: string,
  Headers?: string,
  Params?: string,
  Body?: string,
  Query?: string,
  Response?: string
) {
  if (method.toLowerCase() == "post") {
    return GetPostApiMethod(
      endpoint,
      functionName,
      Headers,
      Params,
      Body,
      Query,
      Response
    );
  } else if (method.toLowerCase() == "get") {
    return GetRestApiMethodImpl(
      endpoint,
      functionName,
      Headers,
      Params,
      Body,
      Query,
      Response
    );
  } else if (method.toLowerCase() == "delete") {
    return DeleteRestApiMethodImpl(
      endpoint,
      functionName,
      Headers,
      Params,
      Body,
      Query,
      Response
    );
  } else if (method.toLowerCase() == "put") {
    return PutRestApiMethodImpl(
      endpoint,
      functionName,
      Headers,
      Params,
      Body,
      Query,
      Response
    );
  } else if (method.toLowerCase() == "patch") {
    return PatchRestApiMethodImpl(
      endpoint,
      functionName,
      Headers,
      Params,
      Body,
      Query,
      Response
    );
  } else {
    throw new Error("UnAccepted API request");
  }
}
