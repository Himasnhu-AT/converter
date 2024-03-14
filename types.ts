export  interface EndpointReturn {
    [statusCode: string]: {
      description: string;
      data?: {
        prisma: {
          model: string;
          action: string;
          args?: {
            [key: string]: any;
          };
        };
      };
    };
  }
  
  export interface Endpoint {
    path: string;
    methods: string[];
    action: string;
    function: string;
    checks: {
      [key: string]: any;
    };
    return: EndpointReturn;
  }
  
  export interface Resource {
    moduleEndpoint: string;
    endpoints: Endpoint[];
  }
  
  export interface Module {
    name: string;
    resources: Resource[];
  }
  
  export interface JSONStructure {
    modules: Module[];
  }
  