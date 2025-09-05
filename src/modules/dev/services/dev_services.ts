import {
  commands,
  dockerImages,
  fileExt,
} from "../utils/docker_image_command_file";
import { generateFileName } from "../utils/generate_filename";
import { exec } from "child_process";
import fs from "fs-extra";

class CodeServices {
  async SolveCode(code: string, language: string) {
    if (!dockerImages[language]) {
      return null;
    }
    const fileId = generateFileName();
    const tempDir = "submissions";
    await fs.ensureDir(tempDir);

    const fileName = `${tempDir}/${fileId}.${fileExt[language]}`;

    await fs.outputFile(fileName, code);
   const hostPath = `${process.cwd().replace(/\\/g, "/")}`;
    const dockerCmd = `docker run --rm -v "${hostPath}:/usr/src/app" -w /usr/src/app ${
      dockerImages[language]
    } bash -c "${commands[language](fileName)}"`;

  return new Promise((resolve, reject) => {
    exec(dockerCmd, async (err, stdout, stderr) => {
      if (err) {
        reject(stderr || err.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
  }
}
export const codeServices = new CodeServices();
