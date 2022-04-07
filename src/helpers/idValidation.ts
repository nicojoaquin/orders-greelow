export const idValidation = (item: Object, itemName: string) => {
  if (!item) throw `No se encuentra el item '${itemName}' con ese id`;
}; //Valida que el id busque algun item, y si no tira un error
