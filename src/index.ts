import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Path to your configuration file
const CONFIG_PATH = path.join(__dirname, "config.json");

// Function to execute commands
function runCommand(command: string) {
  return new Promise<void>((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${err}`);
        reject(err);
      } else if (stderr) {
        console.error(`Error: ${stderr}`);
        reject(stderr);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

// Function to create NestJS elements
async function createNestElements(name: string) {
  await runCommand(`npx nest g module ${name}`);
  await runCommand(`npx nest g controller ${name}`);
  await runCommand(`npx nest g service ${name}`);
}

function updateService(name: string, actions: any[]) {
  const serviceFile = `src/${name}/${name}.service.ts`;
  let serviceCode = `
import { Injectable } from '@nestjs/common';
import prisma from '../prisma/prisma.client';

@Injectable()
export class ${name.charAt(0).toUpperCase() + name.slice(1)}Service {
`;

  actions.forEach((action) => {
    serviceCode += `
  async ${action.function}() {
    return await prisma.${action.action.model.toLowerCase()}.${
      action.action.prisma
    }();
  }
`;
  });

  serviceCode += `
}
`;

  fs.writeFileSync(serviceFile, serviceCode);
}

// Function to update the controller with Prisma logic
function updateController(name: string, endpoints: any[]) {
  const controllerFile = `src/${name}/${name}.controller.ts`;
  let controllerCode = `
import { Controller, ${endpoints
    .map((e) => e.method)
    .join(", ")} } from '@nestjs/common';
import { ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Service } from './${name}.service';

@Controller('${name}')
export class ${name.charAt(0).toUpperCase() + name.slice(1)}Controller {
  constructor(private readonly ${name}Service: ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Service) {}
`;

  endpoints.forEach((endpoint) => {
    controllerCode += `
  @${endpoint.method}('${endpoint.path}')
  async ${endpoint.function}() {
    return await this.${name}Service.${endpoint.function}();
  }
`;
  });

  controllerCode += `
}
`;

  fs.writeFileSync(controllerFile, controllerCode);
}

// Function to generate NestJS elements based on configuration
async function generateNestJS(config: any) {
  const groupedEndpoints: any = {};

  // Group endpoints by their base path
  config.api.forEach((endpoint) => {
    const name = endpoint.path.split("/")[1];
    if (!groupedEndpoints[name]) {
      groupedEndpoints[name] = [];
    }
    groupedEndpoints[name].push(endpoint);
  });

  // Generate elements for each group
  for (const [name, endpoints] of Object.entries(groupedEndpoints)) {
    await createNestElements(name);
    updateService(name, endpoints as any[]); // Cast 'endpoints' to 'any[]'
    updateController(name, endpoints as any[]);
  }

  // Run Prisma generate command to generate Prisma Client
  await runCommand("npx prisma generate");
}

// Read the configuration file
fs.readFile(CONFIG_PATH, "utf-8", async (err, data) => {
  if (err) {
    console.error(`Error reading configuration file: ${err}`);
    return;
  }

  const config = JSON.parse(data);

  try {
    await generateNestJS(config);
    console.log("NestJS and Prisma setup completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
