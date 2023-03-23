import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText, 
  TextField,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  ListItemText,
  OutlinedInput
} from '@mui/material';
// components
import Cookies from 'universal-cookie';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Loader from '../components/common/Loader';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

import { AcmaClient } from '../api/AcmaClient';
import AlertMessage from '../components/common/AlertMessage';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'username', label: 'Usuario', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'verified', label: 'Verificado', alignRight: false },
  { id: 'active', label: 'Status', alignRight: false },
  { id: 'accion', label: 'Acción', alignRight: false},
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [openUserDg, setOpenUserDg] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [updateUserDg, setUpdateUserDg] = useState(false);
  const [alertProps, setAlertProps] = useState({
    show: false
  })
  // const [response, setResponse] = useState(null);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();

  /* const verify = async () => {
    const cookies = new Cookies();
    const token = cookies.get('jwt')
    const acmaClient = new AcmaClient();
    setLoading(true);
    try {
      const res = await acmaClient.verify(token);
      setResponse(res);
      setLoading(false);
    } catch (error) {
      console.error('Error verifying user token', error);
      setResponse(error.response);
      const message = error.response?.data?.message
      if(message === 'jwt malformed' || message === 'jwt expired ') {
        setAlertProps({
          message: 'Su sesión ha caducado',
          type: 'warning',
          handleClose: () => setAlertProps({ show: false })
        });
        await acmaClient.refresh();
        console.log( message)
      } else {
        setAlertProps({
          message,
          type: 'warning',
          handleClose: () => setAlertProps({ show: false })
        });
      }
      setLoading(false);
      
    }
  } */

  const getAllUsers = async () => {
    const acmaClient = new AcmaClient();
    try {
      const res = await acmaClient.getAllUsers();
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      const statusCode = error.response?.status;
      if (statusCode === 401 && cookies.get('refresh_jwt')) {
        await acmaClient.refresh().catch(error => { throw error });
        window.location.reload();
        setLoading(false);
      }
      
    }
  }

  useEffect(() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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

  return (
    <>
      <Helmet>
        <title> Promer | Usuarios </title>
      </Helmet>
      <Loader show={loading}/>
      <AlertMessage alertProps={alertProps}/>
      { users ? ( 
        <>
        <Dialog
          open={openUserDg}
          onClose={closeNewUserDg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Nuevo Usuario
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre(s)"
                    name="name"
                    autoComplete="name"
                    autoFocus />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido(s)"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    id="email"
                    autoComplete="email" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Constraseña"
                    name="password"
                    autoComplete="password"
                    autoFocus />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="passConfirmed"
                    label="Confirmar Constraseña"
                    name="passConfirmed"
                    autoComplete="passConfirmed"
                    autoFocus />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={closeNewUserDg} color="error" variant="outlined">Cancelar</Button>
            <Button onClick={closeNewUserDg} autoFocus variant="outlined">
              Guardar
            </Button>
          </DialogActions>
        </Dialog><Dialog
          open={updateUserDg}
          onClose={closeUpdateUserDg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
              Actualizar Usuario
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={1} justifyContent="center" sx={{ flexGrow: 1 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Nombre(s)"
                      name="name"
                      autoComplete="name"
                      autoFocus />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido(s)"
                      name="lastName"
                      autoComplete="lastName"
                      autoFocus />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Usuario"
                      name="username"
                      autoComplete="username"
                      autoFocus />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="Correo Electrónico"
                      type="email"
                      id="email"
                      autoComplete="email" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Constraseña"
                      name="password"
                      autoComplete="password"
                      autoFocus />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="passConfirmed"
                      label="Confirmar Constraseña"
                      name="passConfirmed"
                      autoComplete="passConfirmed"
                      autoFocus />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={closeUpdateUserDg} color="error" variant="outlined">Cancelar</Button>
              <Button onClick={closeUpdateUserDg} autoFocus variant="outlined">
                Guardar
              </Button>
            </DialogActions>
          </Dialog><Container>
            <AlertMessage alertProps={alertProps} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Usuarios
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={openNewUserDg}>
                Nuevo Usuario
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
                      onSelectAllClick={handleSelectAllClick} />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, username, email, name, roles, verified, active } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src='/assets/images/avatars/unknown.png' />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{username}</TableCell>

                            <TableCell align="left">{email}</TableCell>

                            <TableCell align="left">
                              <Stack direction="row" spacing={1}>
                                {roles.map((role) => (<Chip label={role.name} color='info' key={role.id} />))}
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{verified ? 'Sí' : 'No'}</TableCell>

                            <TableCell align="left">
                              <Stack direction="row" spacing={1}>
                                <Chip label={active ? 'Activo' : 'Desactivado'} color={active ? 'success' : 'warning'} />
                              </Stack>
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
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} />
            </Card>
          </Container><Popover
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
          </Popover></>
      ) : <Loader />} 
    </>
  );
}
