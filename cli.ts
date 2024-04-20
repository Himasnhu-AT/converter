import { JSONStructure } from "./src/types/types";
import { ParseJson } from "./src/parser/parser.service";
import { generateNestJSCodeFromFilePath } from "./src/converter/main.converter";

export function main(argv: string[]) {
  console.warn(argv);
  if (argv.length < 4) {
    console.error(
      "Please provide the file address, step to exec as an argument."
    );
    process.exit(1);
  }

  const filePath = argv[2];
  console.log(filePath);

  const runStep = argv[3];

  generateNestJSCodeFromFilePath(filePath, runStep);
}

main(process.argv);
