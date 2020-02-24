import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const getPayloadFromToken = (sessionToken) => {
  try {
    return jwt.verify(sessionToken, jwtSecret);
  } catch (e) {
    throw new Error('Unsuccessful verification of Session Token');
  }
};

export const createToken = ({userId}) => {
  return jwt.sign({userId}, jwtSecret);
};

export const hashPassword = (password) => {
  const SALT_ROUNDS = 9;
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = (plainText, hashText) => {
  return bcrypt.compare(plainText, hashText);
};
