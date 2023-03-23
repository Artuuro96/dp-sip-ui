import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import { AcmaClient } from '../api/AcmaClient';
import Loader from '../components/common/Loader';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const cookies = new Cookies();
  const userInfo = jwtDecode(cookies.get('jwt'));
  const [context, setContext] = useState({});
  const [loading, setLoading] = useState(true);
  const [alertProps, setAlertProps] = useState({
    show: false
  })
  const [response, setResponse] = useState(null);

  const verify = async () => {
    const cookies = new Cookies();
    const token = cookies.get('jwt')
    const acmaClient = new AcmaClient();
    setLoading(true);
    try {
      const res = await acmaClient.verify(token);
      setContext(userInfo);
      setResponse(res);
      setLoading(false);
    } catch (error) {
      console.error('Error verifying user token', error.response);
      setResponse(error.response);
      const message = error.response?.data?.message
      if(message === 'jwt malformed' || message === 'jwt expired ') {
        setAlertProps({
          message: 'Su sesión ha caducado',
          type: 'warning',
          handleClose: () => setAlertProps({ show: false })
        });
        await acmaClient.refresh();
        console.log(message)
      } else {
        setAlertProps({
          message,
          type: 'warning',
          handleClose: () => setAlertProps({ show: false })
        });
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    verify()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!response) {
    return (
      <Loader loading={loading} />
    )
  }

  if(response?.data?.verified) {
    return (
      <>
        <Helmet>
          <title> Promer | Panel </title>
        </Helmet>
  
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hola {context.name}!
          </Typography>
  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Ventas Semanales" total={"$714,000"} icon={'iconoir:home-sale'} />
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Terrenos Disponibles" total={3} color="info" icon={'mdi:land-plots-circle-variant'} />
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Terrenos Vendidos" total={1} color="success" icon={'mdi:land-plots-marker'} />
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Ventas Canceladas" total={'0'} color="error" icon={'carbon:rule-cancelled'} />
            </Grid>
  
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Ventas Menusales"
                subheader="(+43%) más que el mes pasado"
                chartLabels={[
                  '01/01/2022',
                  '02/01/2022',
                  '03/01/2022',
                  '04/01/2022',
                  '05/01/2022',
                  '06/01/2022',
                  '07/01/2022',
                  '08/01/2022',
                  '09/01/2022',
                  '10/01/2022',
                  '11/01/2022',
                ]}
                chartData={[
                  {
                    name: 'Vendedor 1',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Vendedor 2',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Vendedor 3',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>
  
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Estatus Acutal"
                chartData={[
                  { label: 'Disponibles', value: 3 },
                  { label: 'Vendidos', value: 1 },
                  { label: 'Apartados', value: 1 },
                  { label: 'Invadidos', value: 1 },
                  { label: 'Liquidado', value: 1 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
              />
            </Grid>
  
            {/* <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates
                title="Conversion Rates"
                subheader="(+43%) than last year"
                chartData={[
                  { label: 'Italy', value: 400 },
                  { label: 'Japan', value: 430 },
                  { label: 'China', value: 448 },
                  { label: 'Canada', value: 470 },
                  { label: 'France', value: 540 },
                  { label: 'Germany', value: 580 },
                  { label: 'South Korea', value: 690 },
                  { label: 'Netherlands', value: 1100 },
                  { label: 'United States', value: 1200 },
                  { label: 'United Kingdom', value: 1380 },
                ]}
              /> 
            </Grid> 
  
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Current Subject"
                chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                chartData={[
                  { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                  { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                  { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid> */ }
  
            { /* <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Ventas en tiempo real"
                list={
                [{
                  id: faker.datatype.uuid(),
                  land: "Lomas de San Francisco Tepojaco Lote 93",
                  description: "Vendido por Vendedor 1",
                  postedAt: new Date()
                },
                {
                  id: faker.datatype.uuid(),
                  land: "Lomas de San Francisco Tepojaco Lote 45",
                  description: "Vendido por Vendedor 2",
                  postedAt: new Date()
                }]
                }
              />
              </Grid> */ }
            
            { /*
            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title="Order Timeline"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    '1983, orders, $4220',
                    '12 Invoices have been paid',
                    'Order #37745 from September',
                    'New order placed #XF-2356',
                    'New order placed #XF-2346',
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.past(),
                }))}
              />
            </Grid>
  
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Traffic by Site"
                list={[
                  {
                    name: 'FaceBook',
                    value: 323234,
                    icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                  },
                  {
                    name: 'Google',
                    value: 341212,
                    icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                  },
                  {
                    name: 'Linkedin',
                    value: 411213,
                    icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                  },
                  {
                    name: 'Twitter',
                    value: 443232,
                    icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                  },
                ]}
              />
            </Grid>
  
            <Grid item xs={12} md={6} lg={8}>
              <AppTasks
                title="Tasks"
                list={[
                  { id: '1', label: 'Create FireStone Logo' },
                  { id: '2', label: 'Add SCSS and JS files if required' },
                  { id: '3', label: 'Stakeholder Meeting' },
                  { id: '4', label: 'Scoping & Estimations' },
                  { id: '5', label: 'Sprint Showcase' },
                ]}
              />
            </Grid> */ } 
          </Grid> 
        </Container>
      </>
    );
  }

  return (<Navigate to={'/login'} />);
}
