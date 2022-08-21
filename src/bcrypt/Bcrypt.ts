import bcrypt from 'bcryptjs';

export default class Bcrypt {
  compare = async (
    passwordReceived: string,
    dbPassword: string,
  ) => bcrypt.compare(passwordReceived, dbPassword);

  hash = async (
    passwordReceived: string,
    saltRounds: number,
  ) => {
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPass = await bcrypt.hash(passwordReceived, salt);

    return hashedPass;
  };
}
