import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const authMiddleware = (app) => {
  app.use(cookieParser());

  const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    jwt.verify(token, process.env.APP_TOKEN_KEY, (err, authData) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden access.' });
      }
      req.authData = authData;
      next();
    });
  };

  app.use(verifyToken);
  return app;
};

export const setCookie = (res, name, value) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(name, value, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 1 // 1 day
  });
};

export default authMiddleware;
