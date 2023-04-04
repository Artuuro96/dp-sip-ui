import { Helmet } from 'react-helmet-async';
// @mui
import { 
  Card, 
  Button, 
  Container, 
  Stack, 
  Typography, 
  TableRow,
  TableBody,
  Paper,
  TableCell,
  TablePagination,
  Table,
  TableContainer,
  IconButton,
  Checkbox,
  Popover,
  MenuItem,
  Link,
} from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filter, isEmpty } from 'lodash';
import Cookies from 'universal-cookie';
import { AcmaClient } from '../api/AcmaClient';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import NewCustomerDg from '../sections/@dashboard/customer/NewCustomerDg';
import UpdateCustomerDg from '../sections/@dashboard/customer/UpdateCustomerDg';
import ClientProfile from '../sections/@dashboard/clients/ClientProfile';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';
import { PromerClient } from '../api/PromerClient';

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'cellPhone', label: 'Celular', alignRight: false },
  { id: 'phone', label: 'Telefono', alignRight: false},
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'behavior', label: 'Comportamiento', alignRight: false },
  { id: 'action', label: 'Acción', alignRight: false },
];

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function CustomerPage() {
  const [loading, setLoading] = useState(false);
  const [openCustomerDg, setOpenCustomerDg] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [updateDg, setUpdateDg] = useState(false);
  const [alertProps, setAlertProps] = useState({
    show: false
  })
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  const [clientProfileDg, setClientProfileDg] = useState(false);
  const [clientSelected, setClientSelected] = useState(null);
  const [creditIds, setCreditIds] = useState([]);
  const [customerProfileSelected, setCustomerProfileSelected] = useState(null);
  const [response, setResponse] = useState(null);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const promerClient = new PromerClient();
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

  const findCustomers = async () => {
    try {
      setLoading(true);
      const customersReponse = await promerClient.findCustomers({});
      setCustomers(customersReponse);
      setLoading(false);
    } catch (error) {
      await handleError(error);
    }
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
        behaviourInfo.icon = ''
        behaviourInfo.color = ''
    }
    return behaviourInfo;
  }

  const openAlert = (props) => {
    setAlertProps({
      ...props,
      handleClose: () => setAlertProps({ show: false })
    })
  }

  useEffect(() => {
   findCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenMenu = (event, client) => {
    setOpen(event.currentTarget);
    setClientSelected(client);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setClientSelected(null);
  };

  const openNewCustomerDg = (show) => {
    setOpenCustomerDg(show);
  };

  const openUpdateCustomerDg = (show) => {
    setUpdateDg(show);
  };

  const openClientProfileDg = async (client) => {
    const promerClient = new PromerClient();
    setLoading(true);
    try {
      const response = await promerClient.findCreditIdsByCustomerId(client._id);
      if(isEmpty(response?.creditIds)) {
        setCustomerProfileSelected({
          credit: {},
          customer: client,
          payments: [],
        })
      } else {
        const customerProfile = await promerClient.findCustomerProfile(client._id, response.creditIds[0]);
        setCustomerProfileSelected(customerProfile);
      }
      setCreditIds(response.creditIds);
      setLoading(false);
      setClientProfileDg(true);
    } catch (error) {
      setLoading(false)
      await handleError(error);
    }
    setClientSelected(client);
  };

  const closeClientProfileDg = () => {
    setClientProfileDg(false);
    setClientSelected(null);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

  const filteredCustomers = applySortFilter(customers, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredCustomers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Promer | Clientes </title>
      </Helmet>
      <Loader show={loading}/>
      <AlertMessage alertProps={alertProps}/>
      { customers ? (
        <>
          <Container>
            <AlertMessage alertProps={alertProps}/>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Clientes
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => openNewCustomerDg(true)}>
                Nuevo Cliente
              </Button>
            </Stack> 
            <NewCustomerDg 
              open={openCustomerDg}
              handleCloseDg={() => openNewCustomerDg(false)}
              findCustomers={findCustomers}
              openAlert={openAlert}
            />
            <Card>
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={customers.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { _id, cellPhone, email, name, lastName, phone, secondLastName, behaviour } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                            </TableCell>

                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  <Link href='#' onClick={() => openClientProfileDg(row)}>
                                    {name} {lastName} {secondLastName}
                                  </Link>
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{cellPhone}</TableCell>

                            <TableCell align="left">{phone ||'S/N'}</TableCell>

                            <TableCell align="left">
                              <Stack direction="row" spacing={1}>
                                {email}
                              </Stack> 
                            </TableCell>

                            <TableCell align="center">
                              <Iconify 
                                icon={ getBehaviourStatus(behaviour)?.icon }
                                width={35} 
                                height={35} 
                                sx={{ color: getBehaviourStatus(behaviour)?.color }}
                              />
                            </TableCell>

                            <TableCell align="left">
                              <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Sin Resultados
                              </Typography>

                              <Typography variant="body2">
                                No se encontraron resultados para &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Intente con alguna otra palabra clave
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <ClientProfile open={clientProfileDg} handleCloseDg={closeClientProfileDg} customerProfile={customerProfileSelected} creditIds={creditIds}/>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem onClick={() => openUpdateCustomerDg(true)}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Editar
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Eliminar
            </MenuItem>
          </Popover>
          <UpdateCustomerDg
            open={updateDg}
            handleCloseDg={() => openUpdateCustomerDg(false)}
            client={clientSelected}
          />
        </> 
        ) : ( <Loader /> )
      }
    </> 
  );
  
}
