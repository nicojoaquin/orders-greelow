import bcrypt from "bcryptjs";

export const cryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassord = bcrypt.hashSync(password, salt);
  return hashedPassord;
};

export const comparePasswords = (
  requestPassword: string,
  userPassword: string
): boolean => {
  return bcrypt.compareSync(requestPassword, userPassword);
};
