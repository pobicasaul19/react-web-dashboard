import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/index.js';
import authSchema from '../models/authModel.js';
import { loadUserCollection } from '../config/db.js';
import validationMessage from '../utils/validationError.js';
import { mergeRequestData } from '../utils/mergeRequestData.js';

// Generate access token
const generateAccessToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.APP_TOKEN_KEY, { expiresIn: '7d' });
};

// Login user
export const login = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { email, password } = mergeRequestData(req);

    const field = { email, password };
    const context = { usersCollection, email };
    const errors = await validationMessage(field, authSchema, context);

    errors && res.status(400).json(
      {
        data: errors,
        metadata: {
          message: 'Authentication failed. Please check your credentials.'
        }
      }
    );

    const user = usersCollection.data.users.find(user => user.email === email);
    const accessToken = generateAccessToken(user.uuid);
    const { password: _, ...userWithoutPassword } = user;

    // Set cookies
    const setCookie = (name, value) => {
      res.cookie(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1 // 1 day
      });
    };

    setCookie('accessToken', accessToken);
    setCookie('user', userWithoutPassword);

    res.status(200).json({
      data: { user: userWithoutPassword, token: accessToken },
      metadata: { message: 'Authorized' },
    });
  } catch (error) {
    logger.error('Login error', { error });
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};
