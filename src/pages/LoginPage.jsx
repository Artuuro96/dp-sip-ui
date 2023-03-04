import * as React from 'react';
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('user'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider>
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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 3, mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
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
                href="/panel"
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