/* eslint-disable prefer-destructuring */
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Grid, Divider, Chip, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { isNil } from 'lodash';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { PromerClient } from '../../../api/PromerClient';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import Loader from '../../../components/common/Loader';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ListCard.propTypes = {
  product: PropTypes.object,
};

export default function ListCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const [openDelete, setOpenDeleteDg] = useState(false);

  // Land
  const [editName, setEditName] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editSize, setEditSize] = useState("")
  const [editStatus, setEditStatus] = useState("")

  // Address
  const [editCountry, setEditCountry] = useState("");
  const [editState, setEditState] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editTown, setEditTown] = useState("");
  const [editStreet, setEditStreet] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editZip, setEditZip] = useState("");

  let color = 'info'
  

  // ActualLand
  const [_id, setId] = useState(product._id)
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [size, setSize] = useState(product.size)
  const [square, setSquare] = useState(product.square)
  const [status, setStatus] = useState(product.status)

  // Acutal address
  const [country, setCountry] = useState(product.address.country);
  const [state, setState] = useState(product.address.state);
  const [city, setCity] = useState(product.address.city);
  const [town, setTown] = useState(product.address.town);
  const [street, setStreet] = useState(product.address.street);
  const [number, setNumber] = useState(product.address.number);
  const [zip, setZip] = useState(product.address.zip);


  const statusOptions = [
    { value: 'DISPONIBLE', label: 'DISPONIBLE' },
    { value: 'VENDIDO', label: 'VENDIDO' },
    { value: 'LIQUIDADO', label: 'LIQUIDADO' },
    { value: 'APARTADO', label: 'APARTADO' },
    { value: 'REUBICAR', label: 'REUBICAR' },
    { value: 'SRMIGUEL', label: 'SRMIGUEL' },
    { value: 'INVADIDO', label: 'INVADIDO' },
    { value: 'AFECTADO', label: 'AFECTADO' },
    { value: 'BAJA', label: 'BAJA' },
  ];

  const handleOpenDeleteDg = () => {
    setOpenDeleteDg(true);
  };

  const handleCloseDeleteDg = () => {
    setOpenDeleteDg(false);
  };


  const disabledSaveEditLand = () => {
    if(((editName !== "") || (editPrice !== "") || (editSize !== "") || (editStatus !== "") || (editState !== "") || (editCity !== "") || (editZip !== "")) && canSave)
      return false
    return true
  }

  const handleCountryChange = (event) => {
    setCanSave(true);
    setEditCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setCanSave(true);
    setEditState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCanSave(true);
    setEditCity(event.target.value);
  };

  const handleTownChange = (event) => {
    setCanSave(true);
    setEditTown(event.target.value);
  };

  const handleStreetChange = (event) => {
    setCanSave(true);
    setEditStreet(event.target.value);
  };

  const handleNumberChange = (event) => {
    setCanSave(true);
    setEditNumber(event.target.value);
  };

  const handleNameChange = (event) =>{
    setCanSave(true);
    setEditName(event.target.value)
  }
  const handlePriceChange = (event) =>{
    setCanSave(true);
    setEditPrice(event.target.value)
  }
  const handleSizeChange = (event) =>{
    setCanSave(true);
    setEditSize(event.target.value)
  }
  const handleStatusChange = (event) =>{
    setCanSave(true);
    setEditStatus(event.target.value)
  }
  const handleZipChange = (event) =>{
    const value = event.target.value.replace(/[^0-9]/g, '');
    const maxLength = 5;
    setCanSave(true);

    if (value.length <= maxLength) {
      setEditZip(value.slice(0, maxLength));
    }
  }

  

  const calculatePricePerMeter = (price, size) => {
    const sizeNumber = Number(size.replace('mts', ''))
    return (price / sizeNumber).toFixed(2);
  }

  switch(status) {
    case 'DISPONIBLE':
      color = 'success';
      break;
    case 'VENDIDO':
      color = 'primary';
      break;
    case 'LIQUIDADO':
      color = 'warning';
      break;
    case 'APARTADO':
      color = 'warning';
      break;
    case 'REUBICAR':
      color = 'error';
      break;
    case 'SRMIGUEL':
      color = 'info';
      break;
    case 'INVADIDO':
      color = 'error';
      break;
    case 'AFECTADO':
      color = 'error';
      break;
    case 'BAJA':
      color = 'error';
      break;
    default:
      color = 'info';
      break;
  };


  const openEditDg = () => {
    // Land
    setEditName(name)
    setEditPrice(price)
    setEditSize(size)
    setEditStatus(status)

    // Address
    setEditCountry(country)
    setEditState(state)
    setEditCity(city)
    setEditTown(town)
    setEditStreet(street)
    setEditNumber(number)
    setEditZip(zip)
    setOpenEdit(true);
  }

  const closeEditDg = (event) => {
    event.preventDefault();
    setOpenEdit(false);
    setCanSave(false)
  };
  
  const saveNewLand = async (event) => {
    const newLand = {
      _id,
      name: editName,
      geofence: [],
      available: status === 'DISPONIBLE',
      price: editPrice,
      size: editSize,
      status: editStatus,
      address: {
        country: 'México',
        state: editState,
        city: editCity,
        town: editTown,
        street: editStreet,
        number: editNumber,
        zip: editZip,
      }
    }
    const promerClient = new PromerClient();
    setLoading(true);
    try {
      const res = await promerClient.updateLand(newLand);
      // ActualLand
      setId(res._id);
      setName(res.name);
      setPrice(res.price);
      setSize(res.size);
      setSquare(res.square);
      setStatus(res.status);

      // Acutal address
      setCountry(res.address.country);
      setState(res.address.state);
      setCity(res.address.city);
      setTown(res.address.town);
      setStreet(res.address.street);
      setNumber(res.address.number);
      setZip(res.address.zip);

      setLoading(false);
      closeEditDg(event);
    } catch (error) {

      console.error(error);
      closeEditDg(event);
      setLoading(false);
    }
  }

  const deleteLand = async () => {
    setLoading(true);
    const promerClient = new PromerClient();
    try {
      const res = await promerClient.deleteLand(_id);
      if(res.deleted) {
        window.location.reload();  
      } else {
        console.log(res)
        setOpenDeleteDg(false);
      }
    } catch (error) {
      console.error(error);
      setOpenDeleteDg(false); 
    }
  };

  if(loading) {
    return (
      <Loader />
    );
  }

  return (
    <Card style={{ border: `2px solid`, boxShadow: "5px 10px" }}>
      <Dialog
        open={openEdit}
        onClose={closeEditDg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Editar Terreno
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
                  label="Nombre"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={editName}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="Precio"
                  name="price"
                  autoComplete="price"
                  value={editPrice}
                  onChange={handlePriceChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="size"
                  label="Tamaño"
                  name="size"
                  autoComplete="size"
                  value={editSize}
                  onChange={handleSizeChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" style={{ marginTop: '16px' }}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    label="status"
                    value={editStatus}
                    onChange={handleStatusChange}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" component="h2">
                  Dirección
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="country"
                  label="País"
                  name="country"
                  autoComplete="country"
                  value={editCountry}
                  onChange={handleCountryChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  label="Estado/Provincia"
                  name="state"
                  autoComplete="state"
                  value={editState}
                  onChange={handleStateChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="Ciudad"
                  name="city"
                  autoComplete="city"
                  value={editCity}
                  onChange={handleCityChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="town"
                  label="Municipio/Barrio"
                  name="town"
                  autoComplete="town"
                  value={editTown}
                  onChange={handleTownChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="street"
                  label="Calle"
                  name="street"
                  autoComplete="street"
                  value={editStreet}
                  onChange={handleStreetChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="number"
                  label="Número"
                  name="number"
                  autoComplete="number"
                  value={editNumber}
                  onChange={handleNumberChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="zip"
                  label="Código Postal"
                  name="zip"
                  autoComplete="zip"
                  type="number"
                  value={editZip}
                  inputProps={{
                    maxLength: 5
                  }}
                  onChange={handleZipChange}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={closeEditDg} color="error" variant="outlined">Cancelar</Button>
          <Button onClick={saveNewLand} disabled={disabledSaveEditLand()}  autoFocus variant="outlined">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDeleteDg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliminar"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estas seguro que deseas eliminar este terreno.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteLand} variant="outlined" color="error">Si</Button>
          <Button onClick={handleCloseDeleteDg} variant="outlined" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3} sx={{ m: 3 }}>
        <Grid md={5}>
          <Link color="inherit" underline="hover"  onClick={openEditDg}>
            <Typography variant="subtitle2" noWrap fontSize={20}>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> 
              {street} Mz{square} {number}, {town}, {zip} {city}, {state}, {country}
            </Typography>
           
          </Stack>
        </Grid>
        <Grid md={3} minHeight={20}>
          <Typography variant="subtitle1" fontSize={14} sx={{
            marginLeft: 1,
            alignContent: 'center',
          }}>
              <Chip label={size} variant="outlined" color='primary'/>
              <Chip label={`$${calculatePricePerMeter(price, size)  }/mt`} color='primary' variant="outlined" sx={{marginLeft: 1}} />
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem style={{ border: `1px solid`}}/>
        <Grid md={3}>
          <Typography variant="subtitle1" fontSize={20} sx={{
            zIndex: 9,
            top: 90,
            right: 16,
            position: 'absolute',
          }}>
              { /* <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {priceSale && fCurrency(priceSale)}
              </Typography> */ }
              Costo Total:
              &nbsp;
              {fCurrency(price)}
          </Typography>
        </Grid>
      </Grid>
      <Box>
        {status && (
          <Label
            variant="filled"
            color={color}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'block' }}>
        <IconButton color="secondary" >
          <DeleteIcon onClick={handleOpenDeleteDg} />
        </IconButton>
      </Box>
    </Box>
    </Card>
  );
}
