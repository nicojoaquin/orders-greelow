export const idValidation = (item: Object, itemName: string) => {
  if (!item) throw `No se encuentra el item '${itemName}'`;
};
