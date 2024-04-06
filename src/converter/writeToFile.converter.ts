import * as fs from "fs";
export function WriteToFile(filename: string, data: string) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error("Error writing Template: ", err);
    } else {
      console.log(`${filename} Template generated successfully!`);
    }
  });
}
