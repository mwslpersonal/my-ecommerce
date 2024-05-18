import { convertToBase64 } from "./convert-to-base64";

export const convertMultiplesToBase64 = async (
  files: FileList
): Promise<string[]> => {
  const convertedFiles: string[] = [];
  for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
    const file = files.item(fileIndex);
    if (!file) continue;
    convertedFiles.push(await convertToBase64(file));
  }
  return convertedFiles;
};
