import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import {
  SignInPage,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import { joinDataError } from '../utils';
import AppButton from '../commons/button';
import { useNavigate } from "react-router-dom";
import { ErrorType } from '../models/ErrorType';
import { useAuth } from '../feature/AuthContext';
import LoginService from '../services/LoginService';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const EmailField = () => {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      variant="outlined"
    />
  );
}

const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

const Title = () => {
  return <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
    Login
  </Typography>;
}
const Button = () => {
  return (
    <div className='mt-2'>
      <AppButton editor={true} label='Log in' color='inherit' />
    </div>
  )
}

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
      const errorData = errorInfo.response.data.data;
      return Promise.resolve({
        type: 'CredentialsSignin',
        error: joinDataError(errorData, 'email') || joinDataError(errorData, 'password'),
      });
    }
  };
  return (
    <SignInPage
      slots={{
        title: Title,
        emailField: EmailField,
        passwordField: PasswordField,
        submitButton: Button,
      }}
      signIn={signIn}
      providers={providers}
    />

  );
}
