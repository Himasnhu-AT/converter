import createModuleTemplateCode from "../converter/converter.service";
import { JSONStructure } from "../types/types";
import { ParseJson } from "./parser.service";

export function main(argv: string[]) {
  console.warn(argv);
  if (argv.length < 3) {
    console.error("Please provide the file address as an argument.");
    process.exit(1);
  }

  const filePath = argv[2];
  console.log(filePath);
  const parsedJson: JSONStructure | null = ParseJson(filePath);
  if (parsedJson === null) {
    console.error("Invalid JSON file.");
    process.exit(1);
  }

  parsedJson!.modules.forEach((module) => {
    createModuleTemplateCode(module);
  });
}

main(process.argv);
