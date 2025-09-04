import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export function generateFileName() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "_",
    style: "lowerCase",
  });
}
