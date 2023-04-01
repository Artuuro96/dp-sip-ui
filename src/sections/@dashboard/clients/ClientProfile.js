import { forwardRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { 
  Dialog, 
  Card,
  Grid, 
  Box, 
  Stack, 
  TablePagination,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Table,
  Link,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { PromerClient } from '../../../api/PromerClient';
import Iconify from '../../../components/iconify';
import { fCurrency } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';
import Loader from '../../../components/common/Loader';
import { AcmaClient } from '../../../api/AcmaClient';
import AlertMessage from '../../../components/common/AlertMessage';
import Label from '../../../components/label';




const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

ClientProfile.propTypes = {
  open: PropTypes.bool,
  handleCloseDg: PropTypes.func,
  customerProfile: PropTypes.object,
}

export default function ClientProfile({ open, handleCloseDg, customerProfile}) {
  const [page, setPage] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPaymentDg, setOpenPaymentDg] = useState(false);
  const [payment, setPayment] = useState('');
  const [advance, setAdvance] = useState('');
  const [alertProps, setAlertProps] = useState({
    show: false
  })
  const promerClient = new PromerClient();
  const cookies = new Cookies();
  const acmaClient = new AcmaClient();
  
  useEffect(() => {
    if(customerProfile && customerProfile.customer) {
      setProfile(customerProfile);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerProfile])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  }

  const handleChangeAdvance = (event) => {
    setAdvance(event.target.value);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createNewPayment = async (handlePaymentDg) => {
    console.log("SIIIIIUUUUUUU")
    const newPaymentReq = {
      quantity: parseInt(payment, 10),
      advance: 0,
      creditId: profile.credit._id,
      customerId: profile.customer._id,
      landId: profile.credit.landId,
    }
    setLoading(true);
    let res;
    try {
      res = await promerClient.createPayment(newPaymentReq);
    } catch (error) {
      console.error("ERRRORORORORR",)
      setAlertProps({
        message: error.message,
        type: 'error',
        handleClose: () => setAlertProps({ show: false })
      });
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setAlertProps({
      message: `Pago registrado exitosamente ${res._id}`,
      type: 'success',
      handleClose: () => setAlertProps({ show: false })
    });
    handlePaymentDg(false);
  }

  const handlePaymentDg = (show) => {
    setOpenPaymentDg(show);
  };

  const columns = [
    { 
      id: 'id', 
      label: '# Pago', 
      minWidth: 80 ,
      align: 'center',
    },
    { id: 'createdAt',
      label: 'Fecha', 
      minWidth: 120,
      align: 'center',
    },
    {
      id: 'createdBy',
      label: 'Recibió',
      minWidth: 120,
      align: 'center',
    },
    {
      id: 'quantity',
      label: 'Cantidad',
      minWidth: 120,
      align: 'center',
    },
    {
      id: 'advance',
      label: 'Adelanto',
      minWidth: 120,
      align: 'center',
    },
  ];

  const rows = profile?.payments || []


  return (
    <>
      <AlertMessage alertProps={alertProps}/>
      <Dialog open={openPaymentDg} onClose={handlePaymentDg}>
        <DialogTitle>Nuevo Pago</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h8" component="div">
              <b>Pago Sugerido: {fCurrency(profile?.credit?.nextPayment)}</b>
            </Typography>
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="payment"
            label="Pago"
            name="payment"
            autoComplete="payment"
            onChange={handleChangePayment}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Adelanto"
            name="price"
            autoComplete="advance"
            onChange={handleChangeAdvance}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => handlePaymentDg(false)}>
            Cancelar
          </Button>
          <Button onClick={() => createNewPayment(handlePaymentDg)}>
            Generar Pago
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseDg}
        TransitionComponent={Transition}
      > 
        <AppBar sx={{ position: 'relative', backgroundColor: '#212B36' }}>
          <Toolbar>
            <Button autoFocus color="inherit" variant="contained" onClick={handleCloseDg}>
              Cerrar
            </Button>
            <Typography sx={{ ml: 2, flex: 1, fontSize: 30 }} variant="h6" component="div">
              Perfil del Cliente
            </Typography>
            { /* <Button autoFocus color="inherit" variant="contained" onClick={handleCloseDg}>
              Editar
              </Button> */ }
          </Toolbar>
        </AppBar>
        <Box height="100vh" overflow="hidden" sx={{backgroundColor: '#F4F6F8'}}>
          <Grid container justify="center">
            <Grid xs={12} md={5.5} lg={5.5} sx={{margin: 5, mt: 2}}>
              <Card>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                  {profile?.customer.name} {profile?.customer.lastName} {profile?.customer.secondLastName}
                </Typography>
                <Typography sx={{ ml: 2, flex: 1 }} component="div">
                  <Iconify icon="material-symbols:calendar-month" />
                  {fDate(profile?.customer?.birthday)}
                </Typography>
                <Typography sx={{ ml: 2, flex: 1 }} component="div">
                  <Iconify icon="mdi:cellphone" />{profile?.customer?.cellPhone}
                </Typography>
                <Typography sx={{ ml: 2, flex: 1 }} component="div">
                  <Iconify icon="ant-design:facebook-filled" />
                  <Link color="inherit" underline="hover" href={profile?.customer?.facebook}>
                    {profile?.customer?.facebook}
                  </Link>
                </Typography>
                <Box>
                  <Label
                    variant="filled"
                    sx={{
                      zIndex: 9,
                      top: 16,
                      right: 16,
                      position: 'absolute',
                      textTransform: 'uppercase',
                    }}
                  >
                    {profile?.customer?.behaviour}
                  </Label>
                </Box>
              </Card>
            </Grid>
            <Grid xs={12} md={5.5} lg={5.5} sx={{marginTop: 2, marginRight: 5, marginLeft:0.7}}>
              <Card>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Dirección de Contacto
                </Typography>
                <Typography sx={{ ml: 2, flex: 1, mt: 1.7 }} component="div">
                  {profile?.customer?.address?.street} #{profile?.customer?.address?.number}, <br />
                  {profile?.customer?.address?.town}, {profile?.customer?.address?.city} <br />
                  {profile?.customer?.address?.state}, C.P. {profile?.customer?.address?.zip}, México.
                </Typography>
              </Card>
            </Grid>
            <Grid xs={12} md={5.5} lg={5.5} sx={{margin: 5, mt: 1}}>
              <Card>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h5" sx={{ ml: 2, mt: 1, flex: 1 }} >
                    Pagos
                  </Typography>
                  <Button 
                    size="small" 
                    variant="contained" 
                    sx= {{mt: 1.1, mr: 1.5, backgroundColor: "061B64"}} 
                    startIcon={<Iconify icon="eva:plus-fill" />} 
                    onClick={() => handlePaymentDg(true)} 
                  >
                    Nuevo Pago
                  </Button>
                </Stack>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 460, minHeight:460 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .map((row) => (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                <TableCell align='center'>
                                  {row?.sequence}
                                </TableCell>
                                <TableCell align='center'>
                                  {fDate(row?.createdAt)}
                                </TableCell>
                                <TableCell align='center'>
                                  {row?.createdBy}
                                </TableCell>
                                <TableCell align='center'>
                                  {fCurrency(row?.quantity)}
                                </TableCell>
                                <TableCell align='center'>
                                  {fCurrency(row?.advance)}
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Card>
            </Grid>
            <Grid xs={12} md={5.5} lg={5.5} sx={{mt: 1, marginRight: 5, marginLeft:0.7}}>
              <Card>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h5" sx={{ ml: 2, flex: 1, marginTop: 1, marginRight: 1 }} >
                    Información del Crédito
                  </Typography>
                </Stack>
                <Typography variant="h7" sx={{ ml: 2, flex: 1 }} >
                  Número de Crédito: <b> {profile?.credit?._id} </b>
                </Typography>
                <Grid container justify="center" sx={{ maxHeight: 460, minHeight:460 }} >
                  <Grid xs={3.7} sx={{mt: 1, mr: 1, ml: 1}}>
                    <Card style={{ border: `2px solid`, boxShadow: "2.5px 5px" }} justify="center" align='center'>
                      <Typography variant="h6" sx={{ ml: 2, flex: 1}} >
                        Crédito <br />
                        {fCurrency(profile?.credit?.totalDebt)}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid xs={3.7} sx={{mt: 1, mr: 1, ml: 1}}>
                    <Card style={{ border: `2px solid`, boxShadow: "2.5px 5px" }} justify="center" align='center'>
                      <Typography variant="h6" sx={{ml:1, flex: 1}} >
                        Saldo al Corte <br />
                        {fCurrency(profile?.credit?.currentBalance)}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid xs={3.7} sx={{mt: 1, mr: 1, ml: 1}}>
                    <Card style={{ border: `2px solid #7A0C2E`, boxShadow: "2.5px 5px #7A0C2E" }} justify="center" align='center'>
                      <Typography variant="h6" sx={{ml:1, flex: 1, color: "#7A0C2E"}} >
                        Próximo Pago <br />
                        {fCurrency(profile?.credit?.nextPayment)}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
