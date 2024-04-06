import {
  //   CheckTypes,
  Endpoint,
  //   EndpointReturn,
  //   Requirement,
} from "../../../types/types";

export function generateServiceMethod(endpoint: Endpoint) {
  return `\nasync ${endpoint.function}() {
        try {
          

            // business logic here
            
          
        } catch(e) {
          console.error(\`Failed ${endpoint.function} Server Error 500:\`);
          console.error(e);
        }
      }`;
}
