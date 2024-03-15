export interface EndpointReturn {
  [statusCode: string]: {
    description: string;
    data?: {
      prisma: {
        model: string;
        action: string;
        select: {
          [key: string]: string;
        }[];
        include: {
          [key: string]: string;
        }[];
        skip?: number;
        take?: number;
        orderBy?: {
          [key: string]: string;
        };
        where?: {
          [key: string]: string;
        }[];
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
