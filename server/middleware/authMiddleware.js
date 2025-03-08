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

export default authMiddleware;
