import { Helmet } from 'react-helmet-async';
import { useState, useEffect  } from 'react';
// @mui
import { 
  Box,
  Container, 
  Typography, 
  Stack, 
  Button, 
  Pagination, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  PaginationItem,
  Link,
  DialogContentText,
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { isNil } from 'lodash';
import Loader from '../components/common/Loader';
import Iconify from '../components/iconify/Iconify'
import { PromerClient } from '../api/PromerClient';
// components
import { LandList } from '../sections/@dashboard/products';
// mock

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  // Import Logic
  const [openImport, setOpenImport] = useState(false);
  const [openNewLand, setOpenNewLand] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [file, setFile] = useState(null);
  const [successImport, setSuccessImport] = useState([]);
  const [failImport, setFailImport] = useState([]);
  const [maxLength, setMaxLength] = useState([]);

  // Paginate Result
  const [pageResult, setPageResult] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalLands, setTotalLands] = useState(0);
  const [defaultLimitResults, setDefaultLimitResults] = useState(2);

  const [searchText, setSearchText] = useState('');

  // Land
  const [name, setname] = useState("")
  const [geofence, setgeofence] = useState("")
  const [available, setavailable] = useState("")
  const [price, setprice] = useState("")
  const [size, setsize] = useState("")
  const [status, setstatus] = useState("")

  // Address
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zip, setZip] = useState("");

  const fileTypeImport = 'xlsx';
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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const searchLands = async () => {
    const promerClient = new PromerClient();
    try {
      const search = {
        limit: defaultLimitResults,
        skip: 1,
        keyValue: searchText
      }
      if(isNil(search.keyValue)) {
        findAllLands();
      } else {
        const res = await promerClient.findAllLands(search);
        setPageResult(res.data.result);
        setActualPage(1)
        setPages(res.data.pages)
        setTotalLands(res.data.total)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleTownChange = (event) => {
    setTown(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleNameChange = (event) =>{
    setname(event.target.value)
  }
  const handleGeofenceChange = (event) =>{
    setgeofence(event.target.value)
  }
  const handleAvailableChange = (event) =>{
    setavailable(event.target.value)
  }
  const handlePriceChange = (event) =>{
    setprice(Number(event.target.value))
  }
  const handleSizeChange = (event) =>{
    setsize(event.target.value)
  }
  const handleStatusChange = (event) =>{
    setstatus(event.target.value)
  }
  const handleZipChange = (event) =>{
    const value = event.target.value.replace(/[^0-9]/g, '');
    const maxLength = 5;

    if (value.length <= maxLength) {
      setZip(value.slice(0, maxLength));
    }
  }

  useEffect(() => {
    findAllLands();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findAllLands = async () => {
    const promerClient = new PromerClient();
    try {
      const res = await promerClient.findAllLands({
        limit: defaultLimitResults,
        skip: actualPage
      });
      setPageResult(res.data.result);
      setActualPage(res.data.page)
      setPages(res.data.pages)
      setTotalLands(res.data.total)
    } catch (error) {
      console.error(error);
    }
  }

  const handlePagePageChange = async (event, value) => {
    const promerClient = new PromerClient();
    setLoading(true);
    try {
      const res = await promerClient.findAllLands({
        limit: defaultLimitResults,
        skip: value
      });
      setPageResult(res.data.result);
      setActualPage(value)
      setPages(res.data.pages)
      setTotalLands(res.data.total)
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    
  }

  

  const sendFileRest = async (event) => {
    event.preventDefault();
    const promerClient = new PromerClient();
    setLoading(true);
    try {
      const res = await promerClient.importFile(file);
      setFile(null);
      setOpenResult(true);

      setMaxLength(Math.max(res.successfulLandsObj.length, res.errorLandsObj.length));
      setSuccessImport(res.successfulLandsObj);
      setFailImport(res.errorLandsObj);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      closeImportDg(event);
    }
  }

  const openImportDg = () => {
    setOpenImport(true);
  }
  const closeImportDg = (event) => {
    event.preventDefault();
    setOpenImport(false);
    setTimeout(() => {
      setFile(null);
      setOpenResult(false)
    }, 500);
  };

  const saveNewLand = async () => {
    const newLand = {
      name,
      geofence: [],
      available: status === 'DISPONIBLE',
      price: Number(price),
      size,
      status,
      address: {
        country: 'México',
        state,
        city,
        town,
        street,
        number,
        zip: Number(zip),
      }
    }
    const promerClient = new PromerClient();
    setLoading(true);
    try {
      await promerClient.createLand(newLand);
      closeNewLandDg()
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      closeNewLandDg();
    }
  }

  const disabledSaveNewLand = () => {
    if(isNil(name) || isNil(price) || isNil(size) || isNil(status) || isNil(state) || isNil(city) || isNil(zip))
      return true
    return false
  }


  const cleanAllNewLandFields = () => {
    // Land
    setname("");
    setgeofence("");
    setavailable("");
    setprice("");
    setsize("");
    setstatus("");

    // Address
    setCountry("");
    setState("");
    setCity("");
    setTown("");
    setStreet("");
    setNumber("");
    setZip("");
  }

  const openNewLandDg = () => {
    setOpenNewLand(true);
  }

  const closeNewLandDg = () => {
    setTimeout(() => {
      cleanAllNewLandFields()
    }, 500);
    setOpenNewLand(false);
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    validateFile(event.dataTransfer.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    validateFile(event.dataTransfer.files[0]);
  };

  const handleSelectFile = (event) => {
    event.preventDefault();
    validateFile(event.target.files[0]);
  };

  const validateFile = (file) => {
    if (!file)
      return
    const typeFile = file.name.split('.')[1];
    if (typeFile !== fileTypeImport)
      return
    setFile(file);
  }

  if(loading) {
    return (
      <Loader />
    );
  }


  const renderDragDropArea = () => {
    if (file) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" align="center" gutterBottom>
            Archivo cargado:
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            {file.name}
          </Typography>
        </Box>
      );
    } 
    if (openResult) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" align="center" gutterBottom>
            Resultados
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {successImport.length > 0 && <TableCell>Exito</TableCell>}
                  {successImport.length > 0 && <TableCell>Ids</TableCell>}
                  {failImport.length > 0 && <TableCell>Fallos</TableCell>}
                  {failImport.length > 0 && <TableCell>Mensaje de error</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: maxLength }).map((_, index) => (
                  <TableRow key={index}>
                    {successImport[index] && (
                      <>
                        <TableCell>{successImport[index].name}</TableCell>
                        <TableCell>{successImport[index].id}</TableCell>
                      </>
                    )}
                    {!successImport[index] && (
                      <>
                        {successImport.length > 0 && <TableCell />}
                        {successImport.length > 0 && <TableCell />}
                      </>
                    )}
                    {failImport[index] && (
                      <>
                        <TableCell>{failImport[index].name}</TableCell>
                        <TableCell>{failImport[index].error}</TableCell>
                      </>
                    )}
                    {!failImport[index] && (
                      <>
                        {failImport.length > 0 && <TableCell />}
                        {failImport.length > 0 && <TableCell />}
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    }
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="dashed"
        borderRadius={8}
        borderColor="text.secondary"
        padding={4}
        marginBottom={4}
        width="100%"
        height={200}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Arrastra y suelta un archivo aquí
        </Typography>
        <Typography variant="subtitle1" align="center">
            <Button
              variant="contained"
              component="label"
              onChange={handleSelectFile}
            >
              o haz clic para seleccionar un archivo
              <input
                type="file"
                hidden
              />
            </Button>
        </Typography>
      </Box>
    );
    
  };

  return (
    <>
      <Helmet>
        <title> Promer | Terrenos </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Terrenos
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} sx={{ ml: 'auto', mr: '10px' }} onClick={openImportDg}>
            Importar desde EXCEL
          </Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={openNewLandDg} >
            Nuevo Terreno
          </Button>
        </Stack>


        <Dialog
          open={openImport}
          onClose={closeImportDg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Nueva importacion
          </DialogTitle>
          <Divider />
          <DialogContent>
            {renderDragDropArea()}
          </DialogContent>
          <Divider />
          <DialogActions>
            {!openResult  && <Button onClick={closeImportDg} color="error" variant="outlined">Cancelar</Button>}
            {!openResult  && <Button onClick={sendFileRest} disabled={!file} autoFocus variant="outlined">
              Guardar
            </Button>}
            {openResult  && <Button onClick={closeImportDg} color="primary" variant="outlined">Ok</Button>}
            
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNewLand}
          onClose={closeNewLandDg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Nuevo Terreno
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
                    value={name}
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
                    value={price}
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
                    value={size}
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
                      value={status}
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
                    select
                    value={country}
                    onChange={handleCountryChange}
                  >
                    <MenuItem value="México">México</MenuItem>
                  </TextField>
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
                    value={state}
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
                    value={city}
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
                    value={town}
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
                    value={street}
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
                    value={number}
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
                    value={zip}
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
            <Button onClick={closeNewLandDg} color="error" variant="outlined">Cancelar</Button>
            <Button onClick={saveNewLand} disabled={disabledSaveNewLand()} autoFocus variant="outlined">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
          style={{ textAlign: 'right' }}
        >
        <TextField 
          id="outlined-search" 
          label="Buscar por nombre" 
          type="search" 
          fullWidth 
          value={searchText}
          onChange={handleSearch} 
        />
        <IconButton type="button" sx={{ p: '10px' }} onClick={searchLands} aria-label="search">
            <SearchIcon />
        </IconButton>
        </Paper>

        <LandList products={pageResult} style={{ marginTop: '20px' }}  />
        <Stack spacing={2} marginTop={5} alignItems="center">
          <Pagination
            count={pages}
            page={actualPage}
            onChange={handlePagePageChange}
            color="primary"
            hideNextButton={actualPage === pages}
            hidePrevButton={actualPage === 1}
            disabled={defaultLimitResults === 0}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}`}
                {...item}
                disabled={actualPage === item.page} 
              />
            )}
          />
        </Stack>
      </Container>
    </>
  );
}
