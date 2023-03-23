import { 
  Container, 
  Typography, 
  List, 
  ListItem,
  Button,
  CardHeader,
  CardContent,
  Card,
  Grid
} from '@mui/material';
import SaleCard from '../sections/@dashboard/sales/SaleCard';
import SaleCardListHeader from '../sections/@dashboard/sales/SaleListHeader';

export default function SalePage() {
  const cards = [
    { title: 'Tarjeta 1', content: 'Contenido de la tarjeta 1' },
    { title: 'Tarjeta 2', content: 'Contenido de la tarjeta 2' },
    { title: 'Tarjeta 3', content: 'Contenido de la tarjeta 3' },
  ];
  
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Ventas
      </Typography>
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
