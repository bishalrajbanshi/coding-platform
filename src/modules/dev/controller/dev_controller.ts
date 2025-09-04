import { Request, Response } from "express";
import { exec } from "child_process";
import fs from "fs-extra";
import { generateFileName } from "../utils/generate_filename";
import { commands, dockerImages, fileExt } from "../utils/docker_image_command_file";

export const runCode = async (req: Request, res: Response) => {
  const { code, language } = req.body;

  if (!dockerImages[language]) {
    return res.status(400).json({ error: "Unsupported language" });
  }
  const fileId = generateFileName();
  const tempDir = "submissions";
  await fs.ensureDir(tempDir);

  const fileName = `${tempDir}/${fileId}.${fileExt[language]}`;
  console.log(fileName);
  

  try {
    await fs.outputFile(fileName, code);
    const hostPath = process.cwd().replace(/\\/g, "/");
    const dockerCmd = `docker run --rm -v "${hostPath}:/usr/src/app" -w /usr/src/app ${
      dockerImages[language]
    } bash -c "${commands[language](fileName)}"`;

    exec(dockerCmd, async (err, stdout, stderr) => {
      //   await fs.remove(fileName);
      if (err) {
        return res.json({ success: false, error: stderr || err.message });
      }

      res.json({ success: true, output: stdout.trim() });
    });
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
};
