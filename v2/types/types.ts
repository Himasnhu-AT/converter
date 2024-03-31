export interface Args {
  select: { [key: string]: string }[];
  include: { [key: string]: string }[];
  skip?: number;
  take?: number;
  orderBy?: { [key: string]: string };
  where?: { [key: string]: string }[];
}

export interface EndpointReturn {
  [statusCode: string]: {
    description: string;
    data?: {
      prisma: {
        model: string;
        action: string;
        args: Args;
      };
    };
  };
}

export interface CheckTypes {
  if: string[];
  // so on...
}

export interface Requirement {
  Headers: {
    key: string;
    value: string | number | boolean | JSON;
  };
  Body: {};
}
export interface Endpoint {
  path: string;
  description: string;
  methods: string;
  action: string;
  function: string;
  checks: { [key: string]: CheckTypes };
  return: EndpointReturn;
  req: Requirement;
}

export interface Resource {
  moduleEndpoint: string;
  description: string;
  endpoints: Endpoint[];
}

export interface Module {
  name: string;
  description: string;
  resources: Resource[];
}

export interface Application {
  name: string;
  description: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface JSONStructure {
  application: Application;
  modules: Module[];
}
