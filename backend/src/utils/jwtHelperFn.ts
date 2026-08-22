import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
}

export const signToken = (email: string): string => {
  return jwt.sign({ email } as JwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
