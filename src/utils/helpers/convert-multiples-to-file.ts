import { base64ToFile } from "./base64-to-file";

export const convertMultiplesToFile = (base64s: string[]): File[] => {
  return base64s.map((base64) => base64ToFile(base64));
};
