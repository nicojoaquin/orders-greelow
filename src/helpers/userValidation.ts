export const userValidation = (reg: string, user: string) => {
  if (reg !== user) throw "El registro no pertenece a este usuario";
};
