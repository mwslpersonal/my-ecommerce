export const base64ToFile = (base64: string): File => {
  const arr = base64.split(",");
  const splittedBySemicolon = base64.split(";");
  const filename =
    splittedBySemicolon[splittedBySemicolon.length - 1].split("=")[1];
  const mime = arr[0]?.match(/:(.*?);/)?.[1];
  const bstr = atob(arr[arr.length - 1].split(";")[0]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
