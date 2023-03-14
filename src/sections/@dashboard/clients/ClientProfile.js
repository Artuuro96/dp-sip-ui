import { forwardRef, useState } from 'react';
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
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify';
import { fCurrency } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

ClientProfile.propTypes = {
  open: PropTypes.bool,
  handleCloseDg: PropTypes.func,
  client: PropTypes.object,
}

export default function ClientProfile({ open, handleCloseDg, client }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log(client?.credit)


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      id: 'payment',
      label: 'Cantidad',
      minWidth: 120,
      align: 'center',
    },
    {
      id: 'method',
      label: 'Método',
      minWidth: 120,
      align: 'center',
    },
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  console.log("?===========>", client)
  
  const rows = client?.payments || []
  return(
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
          <Grid xs={12} md={12} sx={{marginTop: 2, marginRight: 5, marginLeft: 5}}>
            <Card>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                {client?.name} {client?.lastName} {client?.secondLastName}
              </Typography>
              <Typography sx={{ ml: 2, flex: 1 }} component="div">
                Edad: {client?.age} años<br/>
                Genero: {client?.gender}<br/>
                Facebook: {client?.facebook}
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} md={5.5} lg={5.5} sx={{margin: 5, mt: 2}}>
            <Card>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" sx={{ ml: 2, mt: 1, flex: 1 }} >
                  Pagos
                </Typography>
                <Button size="small" variant="contained" sx= {{mt: 1.1, mr: 1.5, backgroundColor: "061B64"}} startIcon={<Iconify icon="eva:plus-fill" />} >
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
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? fCurrency(value)
                                      : typeof value === 'object'
                                      ? fDate(value)
                                      : value
                                      }
                                  </TableCell>
                                );
                              })}
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
          <Grid xs={12} md={5.5} lg={5.5} sx={{marginTop: 2, marginRight: 5, marginLeft:0.7}}>
            <Card>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" sx={{ ml: 2, flex: 1, marginTop: 1, marginRight: 1 }} >
                  Información del Crédito
                </Typography>
              </Stack>
              <Typography variant="h7" sx={{ ml: 2, flex: 1 }} >
                Número de Crédito: {client?.credit.creditNumber}
              </Typography>
              <Grid container justify="center" sx={{ maxHeight: 460, minHeight:460 }} >
                <Grid xs={3.7} sx={{mt: 1, mr: 1, ml: 1}}>
                  <Card style={{ border: `2px solid`, boxShadow: "2.5px 5px" }} justify="center" align='center'>
                    <Typography variant="h6" sx={{ ml: 2, flex: 1}} >
                      Crédito <br />
                      {fCurrency(client?.credit.totalDebt)}
                    </Typography>
                  </Card>
                </Grid>
                <Grid xs={3.7} sx={{mt: 1, mr: 1, ml: 1}}>
                  <Card style={{ border: `2px solid`, boxShadow: "2.5px 5px" }} justify="center" align='center'>
                    <Typography variant="h6" sx={{ml:1, flex: 1}} >
                      Saldo al Corte <br />
                      {fCurrency(client?.credit.currentBalance)}
                    </Typography>
                  </Card>
                </Grid>
                <Grid xs={3.7} sx={{mt: 1, mr: 1, ml: 1}}>
                  <Card style={{ border: `2px solid #7A0C2E`, boxShadow: "2.5px 5px #7A0C2E" }} justify="center" align='center'>
                    <Typography variant="h6" sx={{ml:1, flex: 1, color: "#7A0C2E"}} >
                      Próximo Pago <br />
                      {fCurrency(client?.credit.regularPayment)}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
