import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Card, Box, CardHeader, CardContent } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import AlertMessage from '../components/common/AlertMessage';
import { AcmaClient } from '../api/AcmaClient';
import Loader from '../components/common/Loader';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Grupo Promer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [alertProps, setAlertProps] = useState({
    show: false
  })



  const handleSubmit = async (event) => {
    const acmaClient = new AcmaClient();
    let response;
    event.preventDefault();
    setLoading(true);
    try {
      response = await acmaClient.login(username, password);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setAlertProps({
        message: 'Usuario o constraseña incorrectos, intente de nuevo',
        type: 'warning',
        handleClose: () => setAlertProps({ show: false })
      });
    }
    const decoded = jwtDecode(response?.accessToken);
    const refreshDecoded = jwtDecode(response?.refreshToken);
    cookies.set('jwt', response?.accessToken, {
      expires: new Date(decoded.exp * 1000),
    })
    cookies.set('refresh_jwt', response?.refreshToken, {
      expires: new Date(refreshDecoded.exp * 1000),
    })
    navigate('/panel', { replace: true });
  };

  if(loading) {
    return (
      <Loader/>
    );
  }
  return (
    <ThemeProvider>
      <AlertMessage alertProps={alertProps}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card sx={{ marginTop: 30 }} >
          <CardHeader sx={{ bgcolor: 'secondary.main' }}> </CardHeader>
          <CardContent sx= {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}> 
            <Avatar sx={{ m: 2, mb: 1, bgcolor: 'secondary.main', alignItems: 'center' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ m: 0 }}>
              <b>Iniciar Sesión</b>
            </Typography>
            <Box component="form" noValidate sx={{ m: 3, mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={ (e) => setUsername(e.target.value) }
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={ (e) => setPassword(e.target.value) }
                name="password"
                label="Constraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx= {{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Iniciar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}