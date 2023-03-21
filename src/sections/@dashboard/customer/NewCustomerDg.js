import {
  Button,
  MenuItem,
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
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Loader from '../../../components/common/Loader';
import { PromerClient } from '../../../api/PromerClient';

NewCustomerDg.propTypes = {
  open: PropTypes.bool,
  handleCloseDg: PropTypes.func,
  openAlert: PropTypes.func,
  findCustomers: PropTypes.func,
}

const updateCustomer = async () => {
  console.log("UPDATE CONSUMER");
}

const promerClient = new PromerClient();

export default function NewCustomerDg({open, handleCloseDg, findCustomers, openAlert,}) { 
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
 
  const closeNewCustomerDg = () => {
    setNewUser({})
    handleCloseDg();
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  }

  const handleInputDate = (date) => {
    setNewUser({
      ...newUser,
      birthday: date,
    })
  }

  const handleInputNameChange = (e) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      lastName: e.target.value?.split(' ')[0],
      secondLastName: e.target.value?.split(' ')[1],
    });
  }

  const handleInputAddress = (e) => {
    e.preventDefault();
    const { name, value, error } = e.target;
    console.log(error)
    setNewUser({
      ...newUser,
      address: {
        ...newUser.address,
        [name]: value
      }
    });
  }

  const handleGenderChange = (e) => {
    setNewUser({
      ...newUser,
      gender: e.target.value
    })
  };

  const createNewCustomer = async (e) => {
    e.preventDefault();
    newUser.address.zip = Number(newUser?.address?.zip);
    newUser.address.country = 'Mexico';
    setLoading(true);
    try {
      await promerClient.createCustomer(newUser);
      handleCloseDg();
      await findCustomers();
      openAlert({
        message: "Usuario credo existosamente",
        type: 'success',
      });
      setLoading(false);
    } catch (error) {
      console.log("Error creating new user", error);
      openAlert({
        message: "Hubo un problema al crear el usuario, intente más tarde o contacte a soporte",
        type: 'error',
      });
      setLoading(false);
    }
  }

  if(loading) {
    return (
      <Loader />
    );
  }
  
  return (
    <Dialog
    open={open}
    onClose={handleCloseDg}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Nuevo Cliente
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
              autoFocus
              helperText="Nombre es requerido"
              error={false}
              onChange={(e) => handleInputChange(e)}
            />
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
              autoFocus
              error={false}
              onChange={(e) => handleInputNameChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="gender" error>Género</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={newUser.gender || ''}
              label="Género"
              onChange={handleGenderChange}
            >
              <MenuItem value='MALE'>Masculino</MenuItem>
              <MenuItem value='FEMALE'>Femenino</MenuItem>
              <MenuItem value='UNKNOWN'>Desconocido</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Teléfono"
              name="phone"
              autoComplete="phone"
              autoFocus
              error={false}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cellPhone"
              label="Celular"
              name="cellPhone"
              autoComplete="cellPhone"
              autoFocus
              error={false}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
                margin="normal"
                fullWidth
                id="rfc"
                label="RFC"
                name="rfc"
                autoComplete="rfc"
                autoFocus
                error={false}
                onChange={(e) => handleInputChange(e)}
              />
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
              autoComplete="email"
              error={false}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="facebook"
              label="Facebook"
              name="facebook"
              autoComplete="facebook"
              autoFocus
              error={false}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns} style={{margin: 5}}>
                <DatePicker 
                  label= "Fecha de Nacimiento" 
                  name="birthday" 
                  id="birthday"
                  defaultDate={new Date()}
                  error={false}
                  onChange={(date) => handleInputDate(date)}/>
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="street"
              label="Calle"
              name="street"
              autoComplete="street"
              autoFocus
              error={false}
              onChange={(e) => handleInputAddress(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="number"
              label="Numero"
              name="number"
              autoComplete="number"
              autoFocus
              error={false}
              onChange={(e) => handleInputAddress(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="town"
              label="Colonia"
              name="town"
              autoComplete="town"
              autoFocus
              error={false}
              onChange={(e) => handleInputAddress(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="city"
              label="Municipio / Delegación"
              name="city"
              autoComplete="city"
              autoFocus
              error={false}
              onChange={(e) => handleInputAddress(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="state"
              label="Estado"
              name="state"
              autoComplete="state"
              autoFocus
              error={false}
              onChange={(e) => handleInputAddress(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              id="zip"
              label="CP"
              name="zip"
              autoComplete="zip"
              autoFocus
              error={false}
              onChange={(e) => handleInputAddress(e)}
            />
          </Grid>
        </Grid>
      </DialogContentText>
    </DialogContent>
    <Divider />
    <DialogActions>
      <Button onClick={closeNewCustomerDg} color="error" variant="outlined">Cancelar</Button>
      <Button type="submit" onClick={createNewCustomer} autoFocus variant="outlined">
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
  )
}
