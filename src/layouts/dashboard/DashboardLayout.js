import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import Header from './header';
import Nav from './nav';
import Loader from '../../components/common/Loader';



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
  const cookies = new Cookies()
  const token = cookies.get('jwt');
  const userInfo = jwtDecode(token);
  const [open, setOpen] = useState(false);


  if(!token) { return (<Navigate to={'/login'} />); }

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} userInfo={userInfo}/>
      <Main>
        <Outlet />
      </Main>
    </StyledRoot> 
  )
}
