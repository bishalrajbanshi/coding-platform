export const dockerImages: Record<string, string> = {
  js: "node:latest",
  python: "python",
  java: "openjdk:latest",
};

export const fileExt: Record<string, string> = {
  js: "js",
  java: "java",
  python: "py",
};

export const commands: Record<string, (file: string) => string> = {
  js: (file: string) => `node ${file}`,
  python: (file: string) => `python ${file}`,
  java: (file: string) => `javac ${file} && java ${file.split(".")[0]}`,
};
