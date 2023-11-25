'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { bgGradient } from '@/theme/css';
import ThemeProvider from '@/theme';
import { useFormState } from 'react-dom';
import { authenticate } from '@/lib/actions/login';
import { useFormStatus } from 'react-dom';
import { Alert } from '@mui/material';

const Login = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const [state, dispatch] = useFormState(authenticate, undefined);

  const { pending } = useFormStatus();

  const renderForm = (
    <>
      <Box component="form" action={dispatch}>
        {state === 'CredentialsSignin' && (
          <Alert
            severity="error"
            sx={{ marginBottom: '20px' }}
            onClose={() => {}}
          >
            Invalid credentials
          </Alert>
        )}
        <Stack spacing={3}>
          <TextField name="name" label="Usernme" />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: 3 }}
        >
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={pending}
          loading={pending}
        >
          Login
        </LoadingButton>
      </Box>
    </>
  );

  return (
    <ThemeProvider>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: 'overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4" textAlign="center">
              Sign in to XinAdmin
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
