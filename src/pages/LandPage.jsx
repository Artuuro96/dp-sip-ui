import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Typography, Stack, Button, Pagination} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify/Iconify'
// components
import { LandList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nuevo Terreno
          </Button>
        </Stack>
        { /* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
             <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> 
            <ProductSort />
          </Stack>
        </Stack> */} 
        <LandList products={PRODUCTS} />
        <Stack spacing={2} marginTop={5} alignItems="center">
          <Pagination count={10} variant="outlined" />
        </Stack>
      </Container>
    </>
  );
}
