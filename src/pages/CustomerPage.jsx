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
  Chip,
  Checkbox,
  Popover,
  MenuItem,
  Link,
} from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { verify } from '../common/verify';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import ClientProfile from '../sections/@dashboard/clients/ClientProfile';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';

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
  const [openUserDg, setOpenUserDg] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [updateUserDg, setUpdateUserDg] = useState(false);
  const [alertProps, setAlertProps] = useState({
    show: false
  })
  const [response, setResponse] = useState(null);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [clientProfileDg, setClientProfileDg] = useState(false);
  const [clientSelected, setClientSelected] = useState(null);
  

  useEffect(() => {
    setUsers(CUSTOMERLIST)
    verify().then(res => {
      setResponse(res);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const closeNewUserDg = (event) => {
    setOpenUserDg(false);
  };

  const openNewUserDg = (event) => {
    setOpenUserDg(true);
  }

  const createNewUser = (event) => {

  }

  const openUpdateUserDg = () => {
    setUpdateUserDg(true);
  }
  
  const closeUpdateUserDg = () => {
    setUpdateUserDg(false)
  }

  const openClientProfileDg = (client) => {
    setClientProfileDg(true);
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
      const newSelecteds = CUSTOMERLIST.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  if(!response && loading) {
    return (
      <Loader />
    );
  }

  if(response?.data?.verified) {
    return (
      <>
        <Helmet>
          <title> Promer | Usuarios </title>
        </Helmet>
        <Container>
          
          <AlertMessage alertProps={alertProps}/>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Clientes
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={openNewUserDg}>
              Nuevo Cliente
            </Button>
          </Stack> 

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { _id, cellPhone, email, name, lastName, phone, secondLastName, behaviour } = row;
                      console.log(behaviour)
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
              <ClientProfile open={clientProfileDg} handleCloseDg={closeClientProfileDg} client={clientSelected}/>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
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
          <MenuItem onClick={() => setUpdateUserDg(true)}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
            Editar
          </MenuItem>

          <MenuItem sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </>
    );
  } 
}
