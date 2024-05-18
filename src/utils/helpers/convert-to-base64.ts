/**
 *
 * @param file
 * @returns base64 data + ';filename=<file_name>'
 */

export const convertToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve((reader.result as string) + `;filename=${file.name}`);
    };
    reader.onerror = () => {
      reject(`Error on converting ${file.name} to base64`);
    };
    reader.readAsDataURL(file);
  });
};
