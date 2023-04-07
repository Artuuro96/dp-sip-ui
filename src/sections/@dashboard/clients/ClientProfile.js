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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Container,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  Avatar,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useNavigate } from 'react-router-dom';
import { getCurrentPaymentDate } from '../../../utils/calculatePaymentDay';
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
  creditIds: PropTypes.array,
}

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

export default function ClientProfile({ open, handleCloseDg, customerProfile, creditIds}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPaymentDg, setOpenPaymentDg] = useState(false);
  const [payment, setPayment] = useState('');
  const [advance, setAdvance] = useState('');
  const [credId, setCredId] = useState(creditIds[0]);
  const [creditIdentifiers, setCreditIdentifiers] = useState([]);
  const [alertProps, setAlertProps] = useState({
    show: false
  });
  const [anotherQuantity, setAnotherQuantity] = useState(false);
  const [totalPayment, setTotalPayment] = useState(true);
  const [disableTotalPay, setDisableTotalPay] = useState(true);
  const promerClient = new PromerClient();
  const cookies = new Cookies();
  const acmaClient = new AcmaClient();
  
  const handleError = async(error)=> {
    const response = error?.response;

    if (response.status === 401 && cookies.get('refresh_jwt')) {
      await acmaClient.refresh().catch(error => { throw error });
      window.location.reload();
      setLoading(false);
    }

    if (response.status === 401 && !cookies.get('refresh_jwt')) {
      setAlertProps({
        show: true,
        message: 'Tu sesión ha caducado, por favor inica sesión de nuevo',
        type: 'warning'
      })
      setTimeout(() => {
        navigate('/login');
      }, 3500)
    }
  }


  
  useEffect(() => {
    if(customerProfile && customerProfile.customer) {
      setProfile(customerProfile);
    }

    if(creditIds) {
      setCreditIdentifiers(creditIds);
      setCredId(creditIds[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerProfile, creditIds])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeAdvance = (event) => {
    setAdvance(event.target.value);
    setPayment(event.target.value);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onAnotherQuantity = () => {
    setTotalPayment(false);
    setDisableTotalPay(false);
    setAnotherQuantity(true);
  }

  const onTotalPayment = () => {
    setAnotherQuantity(false);
    setTotalPayment(true);
    setDisableTotalPay(true);
    setPayment(Number(profile?.credit?.nextPayment));
  }

  const getBehaviourStatus = (behaviour) => {
    const behaviourInfo = {};
    switch(behaviour) {
      case 'OK':
        behaviourInfo.icon = 'mdi:tick-circle';
        behaviourInfo.color = '#54D62C';
        break;
      case 'DELAY':
        behaviourInfo.icon = 'bi:exclamation-circle-fill';
        behaviourInfo.color = '#ffd65b';
        break;
      case 'NOPAYMENT':
        behaviourInfo.icon = 'gridicons:cross-circle';
        behaviourInfo.color = 'FF4842';
        break;
      case 'BAD':
        behaviourInfo.icon = 'gridicons:cross-circle';
        behaviourInfo.color = '#FFC107';
        break;
      default:
        behaviourInfo.icon = 'mdi:tick-circle'
        break;
    };
    return behaviourInfo;
  }

  const getCreditStatus = (status) => {
    const creditStatusInfo = {};
    switch(status) {
      case 'FINISHED': 
        creditStatusInfo.color = 'primary';
        creditStatusInfo.status = 'FINALIZADO';
        break;
      case 'ASSIGNED':
        creditStatusInfo.color = 'success';
        creditStatusInfo.status = 'ASIGNADO';
        break;
      case 'CREATED':
        creditStatusInfo.color = 'info';
        creditStatusInfo.status = 'CREADO';
        break;
      case 'CANCELADO':
        creditStatusInfo.color = 'error';
        creditStatusInfo.status = 'CANCELADO';
        break;
      default:
        creditStatusInfo.status = '';
        break;
    }
    return creditStatusInfo;
  }

  const findCustomerProfile = async (customerId, creditId) => {
    setLoading(true);
    try {
      const customerProfile = await promerClient.findCustomerProfile(customerId, creditId);
      setProfile(customerProfile);
      setCredId(creditId);
      setLoading(false);
    } catch (error) {
      console.log(error)
      await handleError(error);
      setLoading(false);
    }
  }

  const createNewPayment = async (handlePaymentDg) => {
    const newPaymentReq = {
      quantity: parseFloat(payment, 10),
      creditId: profile.credit._id,
      customerId: profile.customer._id,
      landId: profile.credit.landId,
    }
    setLoading(true);
    let res;
    try {
      res = await promerClient.createPayment(newPaymentReq);
    } catch (error) {
      setAlertProps({
        message: error.message,
        type: 'error',
        handleClose: () => setAlertProps({ show: false })
      });
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    handlePaymentDg(false);
    await findCustomerProfile(profile.customer._id, profile.credit._id);
    setAlertProps({
      message: `Pago registrado exitosamente ${res._id}`,
      type: 'success',
      handleClose: () => setAlertProps({ show: false })
    });
  }

  const handlePaymentDg = (show) => {
    setAdvance(0);
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
      <Dialog maxWidth='sm' fullWidth open={openPaymentDg} onClose={handlePaymentDg}>
        <Loader show={loading} />
        <DialogTitle>Nuevo Pago</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormControl>
              <FormLabel>Seleccione la opción deseada: </FormLabel>
                <FormControlLabel name="totalPayment" checked={totalPayment} value={profile?.credit?.nextPayment} control={<Radio />} onClick={(event) => onTotalPayment(event)} label={
                  <Typography variant="h8" component="div">
                    <b>Total a Pagar: {fCurrency(profile?.credit?.nextPayment)}</b>
                  </Typography>
                }/>
                <FormControlLabel name="anotherQuantity" checked={anotherQuantity} value={anotherQuantity} control={<Radio />} onClick={(event) => onAnotherQuantity(event)} label={
                  <Typography variant="h8" component="div">
                    <b>Otra Cantidad</b>
                  </Typography>
                }/>
            </FormControl>
            <TextField
                margin="normal"
                fullWidth
                id="advance"
                disabled={disableTotalPay}
                value={advance}
                label="Cantidad"
                name="advance"
                autoComplete="advance"
                onChange={handleChangeAdvance}
              />
          </DialogContentText>
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
        <AppBar sx={{ position: 'relative', backgroundColor: 'primary' }}>
          <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDg}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, fontSize: 30 }} variant="h6" component="div">
              Perfil del Cliente
            </Typography>
            { /* <Button autoFocus color="inherit" variant="contained" onClick={handleCloseDg}>
              Editar
              </Button> */ }
          </Toolbar>
        </AppBar>
        <Box height="100vh" sx={{backgroundColor: '#F4F6F8'}}>
          <AlertMessage alertProps={alertProps}/>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ m: 2 }}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                    {profile?.customer.name} {profile?.customer.lastName} {profile?.customer.secondLastName}
                  </Typography>
                  <List dense sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                    <ListItem sx={{ mt: -2}}>
                      <PhoneIphoneTwoToneIcon sx={{width: 20}} />
                      <ListItemText sx={{ml: 1}} primary={fDate(profile?.customer?.birthday)}/>
                    </ListItem>
                    <ListItem sx={{ mt: -2}}>
                      <CalendarMonthTwoToneIcon sx={{width: 20}} />
                      <ListItemText sx={{ml: 1}} primary={`${profile?.customer?.cellPhone} | ${profile?.customer?.cellPhone}`}/>
                    </ListItem>
                    <ListItem sx={{ mt: -2.2, mb: -.5}}>
                      <FacebookTwoToneIcon sx={{width: 20}}/>
                      <ListItemText sx={{ml: 1}} href={profile?.customer?.facebook} primary={profile?.customer?.facebook}/>
                    </ListItem>
                  </List>
                 
                  <Box>
                    <Iconify
                      width={40}
                      color={ getBehaviourStatus(profile?.customer?.behaviour)?.color }  
                      sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                      }} 
                      icon={ getBehaviourStatus(profile?.customer?.behaviour)?.icon }/>
                  </Box>
              </Card>
              <Card sx={{ m: 2 }}>
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
                    disabled = {isEmpty(profile?.credit) || profile?.credit?.nextPayment === 0}
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
            <Grid item xs={12} md={6}>
              <Card sx={{ m: 2 }}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Dirección de Contacto
                </Typography>
                <Typography sx={{ ml: 2, flex: 1, mt: 1.7 }} component="div">
                  {profile?.customer?.address?.street} #{profile?.customer?.address?.number}, <br />
                  {profile?.customer?.address?.town}, {profile?.customer?.address?.city} <br />
                  {profile?.customer?.address?.state}, C.P. {profile?.customer?.address?.zip}, México.
                </Typography>
              </Card>
              <Card sx={{ m: 2 }}>
                { creditIdentifiers && creditIdentifiers.length > 0 ? (
                  <><Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h5" sx={{ ml: 2, flex: 1, marginTop: 1, marginRight: 1 }}>
                    Información del Crédito
                  </Typography>
                  <Box>
                    <Label
                      variant="filled"
                      color={ getCreditStatus(profile?.credit?.status)?.color }
                      sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                      }}
                    >
                      {getCreditStatus(profile?.credit?.status)?.status}
                    </Label>
                  </Box>
                  </Stack><Typography variant="h7" sx={{ ml: 1, flex: 1 }}>
                    <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                      <InputLabel id="demo-select-small">Número de Crédito</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={credId}
                        label="Número de Crédito"
                      >
                        {creditIdentifiers?.map(creditId => (
                          <MenuItem value={creditId} key={creditId} onClick={() => findCustomerProfile(profile?.customer?._id, creditId)}>{creditId}</MenuItem>
                        ))}
                      </Select>
                      </FormControl>
                    </Typography>
                    <Grid container justify="center" sx={{ maxHeight: 460, minHeight: 460 }}>
                      <Grid xs={3.7} sx={{ mt: 1, mr: 1, ml: 1 }}>
                        <Card style={{ border: `2px solid`, boxShadow: "2.5px 5px" }} justify="center" align='center'>
                          <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
                            Crédito <br />
                            {fCurrency(profile?.credit?.totalDebt)}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid xs={3.7} sx={{ mt: 1, mr: 1, ml: 1 }}>
                        <Card style={{ border: `2px solid`, boxShadow: "2.5px 5px" }} justify="center" align='center'>
                          <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>
                            Saldo al Corte <br />
                            {fCurrency(profile?.credit?.currentBalance)}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid xs={3.7} sx={{ mt: 1, mr: 1, ml: 1 }}>
                        <Card style={{ border: `2px solid #7A0C2E`, boxShadow: "2.5px 5px #7A0C2E" }} justify="center" align='center'>
                          <Typography variant="h6" sx={{ ml: 1, flex: 1, color: "#7A0C2E" }}>
                            Próximo Pago <br />
                            {fCurrency(profile?.credit?.nextPayment)}
                          </Typography>
                        </Card>
                      </Grid>
                      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText secondary="Fecha de Pago" primary={fDate(getCurrentPaymentDate(profile?.credit?.paymentDay))} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <CalendarMonthTwoToneIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <BeachAccessIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                      </List>
                    </Grid></> ): 
                  <Container maxWidth={false}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ maxHeight: 460, minHeight:460 }} >
                      <Card
                        sx={{
                          py: 5,
                          boxShadow: 0,
                          textAlign: 'center',
                        }}
                      >
                        <StyledIcon>
                          <Iconify icon="material-symbols:credit-card-off-outline" width={75} height={50} />
                        </StyledIcon>

                        <Typography variant="subtitle2" sx={{ opacity: 10 }}>
                          No tiene un crédito activo actualmente
                        </Typography>
                      </Card>
                    </Grid>
                  </Container> 
                }
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
