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
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Loader from '../../../components/common/Loader';

UpdateCustomerDg.propTypes = {
  open: PropTypes.bool,
  handleCloseDg: PropTypes.func,
  client: PropTypes.object,
};

const updateCustomer = async () => {
  console.log('UPDATE CONSUMER');
};

export default function UpdateCustomerDg({ open, handleCloseDg, client }) {
  console.log("===== CLIENT", client)
  const [updatedCustomer, setUpdatedCustomer] = useState(client || null);
  
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("==========", name, value)
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
  }

  const handleInputDate = (date) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      birthday: date,
    })
  }

  const handleInputNameChange = (e) => {
    e.preventDefault();
    setUpdatedCustomer({
      ...updatedCustomer,
      lastName: e.target.value?.split(' ')[0],
      secondLastName: e.target.value?.split(' ')[1],
    });
  }

  const handleInputAddress = (e) => {
    e.preventDefault();
    const { name, value, error } = e.target;
    console.log(error)
    setUpdatedCustomer({
      ...updatedCustomer,
      address: {
        ...updatedCustomer.address,
        [name]: value
      }
    });
  }

  const handleGenderChange = (e) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      gender: e.target.value
    })
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        Editar Cliente {JSON.stringify(updateCustomer)}
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
                label='Nombre(s)'
                value={updatedCustomer?.name}
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => handleInputNameChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Apellido(s)"
                value={`${client?.lastName} ${client?.secondLastName}`}
                name="lastName"
                autoComplete="lastName"
                autoFocus
                error={false}
                onChange={(e) => handleInputNameChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="gender">Género</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={client?.gender || ''}
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
                value={client?.phone}
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
                value={client?.cellPhone}
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
                  value={client?.rfc}
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
                value={client?.email}
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
                value={client?.facebook}
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
          <Button onClick={handleCloseDg} color="error" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={updateCustomer} autoFocus variant="outlined">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
