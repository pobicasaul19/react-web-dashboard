import {
  SignInPage,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import LoginService from '../services/LoginService';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../feature/AuthContext';
import type { ErrorType } from '../models/ErrorType';

const providers = [
  { id: 'credentials', name: 'Email and Password' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    _provider,
    formData
  ) => {
    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    try {
      const response = await LoginService.validateLogin(payload);
      if (response) {
        login(response);
        navigate('/');
      }
    } catch (error) {
      const errorInfo = error as ErrorType;
      const errorMessage = errorInfo.response.data.metadata.message;
      return Promise.resolve({
        type: 'CredentialsSignin',
        error: errorMessage,
      });
    }
  };

  return (
    <SignInPage
      signIn={signIn}
      providers={providers}
      sx={{
        '& form > .MuiStack-root': {
          marginTop: '2rem',
          rowGap: '0.5rem',
        },
      }}
    />
  );
}
