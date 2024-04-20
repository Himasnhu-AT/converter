import { Field } from "../../dynamo-prisma/dynamoPrisma.types";

export interface Args {
  select?: { [key: string]: string }[];
  include?: { [key: string]: string }[];
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

export interface Module {
  name: string;
  description: string;
  endpoint: string;
  endpoints: Endpoint[];
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
  schema: [{ schemaName: string; fields: Field[]; description: string }];
}
