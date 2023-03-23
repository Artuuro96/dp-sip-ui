import { 
  Container, 
  Typography, 
  Grid,
  Stack,
  Button,
} from '@mui/material';
import { useState } from 'react';
import NewSaleDg from '../sections/@dashboard/sales/NewSaleDg';
import SaleCard from '../sections/@dashboard/sales/SaleCard';
import SaleCardListHeader from '../sections/@dashboard/sales/SaleListHeader';
import Iconify from '../components/iconify/Iconify';


export default function SalePage() {
  const [openSaleDg, setOpenSaleDg] = useState(false);
  const handleSaleDg = (show) => {
    setOpenSaleDg(show)
  }
  const cards = [
    { title: 'Tarjeta 1', content: 'Contenido de la tarjeta 1' },
    { title: 'Tarjeta 2', content: 'Contenido de la tarjeta 2' },
    { title: 'Tarjeta 3', content: 'Contenido de la tarjeta 3' },
  ];
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Ventas
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleSaleDg(true)}>
          Nueva Venta
        </Button>
      </Stack>
        <NewSaleDg handleSaleDg={handleSaleDg} openSaleDg={openSaleDg} />
        <SaleCardListHeader />
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SaleCard 
              title={card.title} 
              content={card.content} 
            />
          </Grid>
        ))}
    </Container>
  );
}
