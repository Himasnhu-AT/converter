import { exec } from "child_process";

function NewNestApp(name) {
  exec(`nest new ${name} -p yarn`, (error, stdout, stderr) => {
    if (error) {
      console.log({
        status: false,
        message: "Error executing 'nest new'",
        error: error,
      });
    } else {
      console.log(stdout);
      console.log(`Done generating, making migrations`);
    }
  });
}

export default NewNestApp;
