import crypto from 'crypto';

export const getEncryptedCredentials = (password: string, github = false, google = false): { password: string; salt: string } => {
  const salt = crypto.randomBytes(16).toString('base64');
  let finalPass = password;
  if (!process.env.GOOGLE_PASS || !process.env.GITHUB_PASS) {
    throw new Error('Variables de entorno google pass y github pass no definidas...');
  }
  if (github) finalPass = process.env.GITHUB_PASS;
  if (google) finalPass = process.env.GOOGLE_PASS;
  const encryptedPassword = crypto.pbkdf2Sync(finalPass, salt, 10000, 64, 'sha1').toString('base64');
  return { salt, password: encryptedPassword };
};

interface IVerifyPassword {
  inputPassword: string;
  encryptedPassword: string;
  salt: string;
}

export const verifyPassword = ({ inputPassword, encryptedPassword, salt }: IVerifyPassword): boolean => {
  const encryptedInputPass = crypto.pbkdf2Sync(inputPassword, salt, 10000, 64, 'sha1').toString('base64');
  return encryptedPassword === encryptedInputPass;
};
