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
import { filter } from 'lodash';
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


const CUSTOMERLIST = [
  {
    "_id" : "640e4cff27b1984deed0s746c",
    "deleted" : false,
    "createdAt" : "2023-03-12T22:06:31.853+0000",
    "createdBy" : "6ea11975-090d-443f-a8ed-95a544df3d11",
    "updatedAt" : "2023-03-12T22:06:31.853+0000",
    "name" : "Gabriela",
    "lastName" : "Valenzuela",
    "secondLastName" : "Martinez",
    "email" : "gaby.valen@gmail.com",
    "cellPhone" : 5541588339.0,
    "phone" : 5541588339.0,
    "rfc" : "ARO960",
    "facebook" : "https://github.com/Artuuro96/dp-sip-server",
    "address" : {
        "country" : "Mexico",
        "state" : "Estado de Mexico",
        "city" : "Cuatitlan",
        "town" : "El mirador",
        "street" : "Lazaro cardenas",
        "number" : "8",
        "zip" : 4095
    },
    "birthday" : "1960-03-20T06:00:00.000+0000",
    "behaviour" : 'SUPERDELAY',
    "age": 30,
    "gender": 'Mujer',
    "avatar" : "https://github.com/Artuuro96/dp-sip-server",
    "credit" : {
      "creditNumber": 88787674321124,
      "totalDebt": 350000,
      "startDate": new Date('05/05/2022'),
      "endDate": new Date('12/28/2028'),
      "currentBalance": 266000,
      "regularPayment": 3500,
      "paymentDay": new Date('09/08/2022'),
    },
    "payments": [
      {
        "id": 1,
        "createdAt": new Date('01/05/2022'),
        "payment": 3500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 2,
        "createdAt": new Date('02/05/2022'),
        "payment": 3500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 3,
        "createdAt": new Date('02/05/2022'),
        "payment": 3500,
        "createdBy": "Vendedor 3",
        "method": "Efectivo"
      },
      {
        "id": 4,
        "createdAt": new Date('03/05/2022'),
        "payment": 3500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 5,
        "createdAt": new Date('04/05/2022'),
        "payment": 3500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      }
    ]
  },
  {
    "_id" : "640e4cff27dhdhfue274742",
    "deleted" : false,
    "createdAt" : "2023-03-12T22:06:31.853+0000",
    "createdBy" : "6ea11975-090d-443f-a8ed-95a544df3d11",
    "updatedAt" : "2023-03-12T22:06:31.853+0000",
    "name" : "Alfonso",
    "lastName" : "Guzman",
    "secondLastName" : "Salvador",
    "email" : "josuers823@gmail.com",
    "cellPhone" : 5541588339.0,
    "phone" : 5541588339.0,
    "rfc" : "ARO960",
    "facebook" : "https://www.facebook.com/GuzmanPocho",
    "address" : {
        "country" : "Mexico",
        "state" : "Estado de Mexico",
        "city" : "Cuatitlan",
        "town" : "El mirador",
        "street" : "Lazaro cardenas",
        "number" : "8",
        "zip" : 54095
    },
    "birthday" : "1960-03-20T06:00:00.000+0000",
    "behaviour" : 'DELAY',
    "age": 25,
    "gender": 'Hombre',
    "avatar" : "https://github.com/Artuuro96/dp-sip-server",
    "credit" : {
      "creditNumber": 1932837246274,
      "totalDebt": 230000,
      "startDate": new Date('01/04/2022'),
      "endDate": new Date('09/12/2026'),
      "currentBalance": 180000,
      "regularPayment": 5500,
      "paymentDay": new Date('09/08/2022'),
    },
    "payments": [
      {
        "id": 1,
        "createdAt": new Date('01/12/2022'),
        "payment": 5500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 2,
        "createdAt": new Date('02/12/2022'),
        "payment": 5500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 3,
        "createdAt": new Date('03/12/2022'),
        "payment": 5500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 4,
        "createdAt": new Date('04/12/2022'),
        "payment": 5500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 5,
        "createdAt": new Date('05/12/2022'),
        "payment": 5500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 6,
        "createdAt": new Date('06/12/2022'),
        "payment": 5500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
    ]
  },
  {
    "_id" : "640e4cff27b34584aczsd07124",
    "deleted" : false,
    "createdAt" : "2023-03-12T22:06:31.853+0000",
    "createdBy" : "6ea11975-090d-443f-a8ed-95a544df3d11",
    "updatedAt" : "2023-03-12T22:06:31.853+0000",
    "name" : "Alicia",
    "lastName" : "Cervantes",
    "secondLastName" : "Molina",
    "email" : "alicia.cervantes@gmail.com",
    "cellPhone" : 5541588339.0,
    "phone" : 5541588339.0,
    "rfc" : "ARO960",
    "facebook" : "https://www.facebook.com/profile.php?id=100002242847801",
    "address" : {
        "country" : "Mexico",
        "state" : "Estado de Mexico",
        "city" : "Cuatitlan",
        "town" : "El mirador",
        "street" : "Lazaro cardenas",
        "number" : "8",
        "zip" : 54095
    },
    "birthday" : "1960-03-20T06:00:00.000+0000",
    "behaviour" : 'OK',
    "age": 40,
    "gender": 'Mujer',
    "avatar" : "https://github.com/Artuuro96/dp-sip-server",
    "credit" : {
      "creditNumber": 88787674321124,
      "totalDebt": 456000,
      "startDate": new Date('05/05/2021'),
      "endDate": new Date('02/08/2024'),
      "currentBalance": 300000,
      "regularPayment": 1500,
      "paymentDay": new Date('09/08/2022'),
    },
    "payments": [
      {
        "id": 1,
        "createdAt": new Date('01/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 2,
        "createdAt": new Date('02/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 3,
        "createdAt": new Date('03/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 4,
        "createdAt": new Date('04/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 5,
        "createdAt": new Date('05/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 6,
        "createdAt": new Date('06/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 7,
        "createdAt": new Date('07/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 8,
        "createdAt": new Date('08/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
      {
        "id": 9,
        "createdAt": new Date('09/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 10,
        "createdAt": new Date('10/12/2022'),
        "payment": 1500,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      },
    ]
  },
  {
    "_id" : "640e4cffdhc737r8cn84deed07124",
    "deleted" : false,
    "createdAt" : "2023-03-12T22:06:31.853+0000",
    "createdBy" : "6ea11975-090d-443f-a8ed-95a544df3d11",
    "updatedAt" : "2023-03-12T22:06:31.853+0000",
    "name" : "Fernando",
    "lastName" : "Beltran",
    "secondLastName" : "Olvera",
    "email" : "fernando_beltran@gmail.com",
    "cellPhone" : 5541588339.0,
    "phone" : 5541588339.0,
    "rfc" : "ARO960",
    "facebook" : "https://github.com/Artuuro96/dp-sip-server",
    "address" : {
        "country" : "Mexico",
        "state" : "Estado de Mexico",
        "city" : "Cuatitlan",
        "town" : "El mirador",
        "street" : "Lazaro cardenas",
        "number" : "8",
        "zip" : 54095
    },
    "birthday" : "1960-03-20T06:00:00.000+0000",
    "behaviour" : 'OK',
    "age": 45,
    "gender": 'Desconocido',
    "avatar" : "https://github.com/Artuuro96/dp-sip-server",
    "credit" : {
      "creditNumber": 88787674321124,
      "totalDebt": 760000,
      "startDate": new Date('05/02/2022'),
      "endDate": new Date('05/01/2028'),
      "currentBalance": 240000,
      "regularPayment": 2400,
      "paymentDay": new Date('01/09/2023'),
    },
    "payments": [
      {
        "id": 1,
        "createdAt": new Date('01/05/2021'),
        "payment": 2400,
        "createdBy": "Vendedor 1",
        "method": "Efectivo"
      },
      {
        "id": 2,
        "createdAt": new Date('02/05/2021'),
        "payment": 2400,
        "createdBy": "Vendedor 2",
        "method": "Efectivo"
      }
    ],
  },
]

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
  const [loading, setLoading] = useState(true);
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
      const customersReponse = await promerClient.findCustomers({});
      setCustomers(customersReponse);
      setLoading(false);
    } catch (error) {
      await handleError(error);
    }
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
    setClientProfileDg(true);
    try {
      const customerProfile = await promerClient.findCustomerProfile(client._id);
      setCustomerProfileSelected(customerProfile)
    } catch (error) {
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
                              {
                                behaviour === 'OK' ? 
                                ( <Iconify icon="mdi:tick-circle" width={35} height={35} sx={{ color: '#54D62C' }}/> ) :
                                behaviour === 'DELAY' ? 
                                ( <Iconify icon="bi:exclamation-circle-fill" width={31} height={35} sx={{ color: '#FFC107' }}/> ) :
                                ( <Iconify icon="gridicons:cross-circle" width={35} height={35} sx={{ color: '#FF4842' }}/> )
                              }
                              
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
                <ClientProfile open={clientProfileDg} handleCloseDg={closeClientProfileDg} customerProfile={customerProfileSelected}/>
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
              Delete
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
