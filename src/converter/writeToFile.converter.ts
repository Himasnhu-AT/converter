import * as fs from "fs";
export function WriteToFile(
  folderPath: string,
  filename: string,
  data: string
) {
  fs.mkdir(folderPath, { recursive: true }, (err) => {});
  fs.writeFile(filename, data, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error(`Error writing Template: File not found - ${err.path}`);
      } else {
        console.error("Error writing Template: ", err);
      }
    } else {
      console.log(`${filename} Template generated successfully!`);
    }
  });
}
