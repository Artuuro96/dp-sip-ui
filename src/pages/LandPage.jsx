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
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import Loader from '../components/common/Loader';
import Iconify from '../components/iconify/Iconify'
import { PromerClient } from '../api/PromerClient';
// components
import { LandList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [file, setFile] = useState(null);
  const [successImport, setSuccessImport] = useState([]);
  const [failImport, setFailImport] = useState([]);
  const [maxLength, setMaxLength] = useState([]);
  const [lands, setLands] = useState([]);
  const fileTypeImport = 'xlsx'

  useEffect(() => {
    setLoading(true);
    findAllLands();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const findAllLands = async () => {
    const promerClient = new PromerClient();
    setLoading(true);
    try {
      const res = await promerClient.findAllLands();
      setLands(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const closeImportDg = (event) => {
    event.preventDefault();
    setOpenImport(false);
    setTimeout(() => {
      setFile(null);
      setOpenResult(false)
    }, 500);
  };

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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
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
        <LandList products={PRODUCTS} />
        <Stack spacing={2} marginTop={5} alignItems="center">
          <Pagination count={10} variant="outlined" />
        </Stack>
      </Container>
    </>
  );
}
