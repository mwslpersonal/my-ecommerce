export function loadToInputFiled(files: File[]) {
  let container = new DataTransfer();
  for (const file of files) {
    container.items.add(file);
  }
  return container.files;
}
