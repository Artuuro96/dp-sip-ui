import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import Loader from '../../components/common/Loader';
import { AcmaClient } from '../../api/AcmaClient';
import Header from './header';
import Nav from './nav';
// import Loader from '../../components/common/Loader';



// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
// ----------------------------------------------------------------------



export default function DashboardLayout() {
  const cookies = new Cookies();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(cookies.get('jwt'));
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(cookies.get('refresh_jwt'));
  const acmaClient = new AcmaClient();

  const refresh = async() => acmaClient.refresh();

  console.log("=====", {
    token,
    refreshToken, loading
  })

  if(!token && refreshToken && loading) {
    refresh()
      .then((response) => {
        console.log(response)
        setToken(cookies.get('jwt'));
        setRefreshToken(cookies.get('refresh_jwt'));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Sesion terminada, redireccionando...', error)
        setLoading(false);
        setTimeout(() => (<Navigate to={'/login'} />), 3000)
      })
    return (<Loader />)
  }

  let userInfo;
  try {
    userInfo = jwtDecode(token);
  } catch (error) {
    console.log(error);
  }


  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} userInfo={userInfo} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} userInfo={userInfo}/>
      <Main>
        <Outlet />
      </Main>
    </StyledRoot> 
  )
}

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YzcyMDA3NS1lZDg0LTQ5MzktOTZlZC0yODBhMTVhNGY4MDciLCJ1c2VybmFtZSI6ImFydHVybzk2IiwibmFtZSI6IkFydHJvIiwibGFzdE5hbWUiOiJSb2RyaWd1ZXoiLCJzZWNvbmRMYXN0TmFtZSI6Ik9sdmVyYSIsImVtYWlsIjoiYXJ0dXJvOTZAZ21haWwuY29tIiwicm9sZXMiOlt7ImlkIjoiZGE4ZWVmYjYtZWZhNy00NzBkLWJjNGEtZmIzOWJhMTdhMDhiIiwibmFtZSI6ImFkbWluIn0seyJpZCI6IjAwMDdhM2U1LWI1YWQtNGIzOS05ZTNiLTFiMzcwZmI1MzljNSIsIm5hbWUiOiJ2ZW5kb3IifV0sImlhdCI6MTY3OTQyMTE0OCwiZXhwIjoxNjc5NDIxMTU4fQ.rS6vdwYH4amtjmidZ12Fom1uhZVNx3HiWHkYyTZ7zBs"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YzcyMDA3NS1lZDg0LTQ5MzktOTZlZC0yODBhMTVhNGY4MDciLCJ1c2VybmFtZSI6ImFydHVybzk2IiwibmFtZSI6IkFydHJvIiwibGFzdE5hbWUiOiJSb2RyaWd1ZXoiLCJzZWNvbmRMYXN0TmFtZSI6Ik9sdmVyYSIsImVtYWlsIjoiYXJ0dXJvOTZAZ21haWwuY29tIiwicm9sZXMiOlt7ImlkIjoiZGE4ZWVmYjYtZWZhNy00NzBkLWJjNGEtZmIzOWJhMTdhMDhiIiwibmFtZSI6ImFkbWluIn0seyJpZCI6IjAwMDdhM2U1LWI1YWQtNGIzOS05ZTNiLTFiMzcwZmI1MzljNSIsIm5hbWUiOiJ2ZW5kb3IifV0sImlhdCI6MTY3OTQyMTE3NSwiZXhwIjoxNjc5NDIxMTg1fQ.JNLkTvhc-V9bNUvxkk4mc1zCXRK4wsaCEKUT7HC-B58"