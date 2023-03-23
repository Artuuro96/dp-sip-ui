import { Card, Grid, Typography } from '@mui/material';

export default function SaleCardListHeader() {
  return (
    <Grid container spacing={2} mb={1} marginTop={-3}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card style={{ boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.2)'}}>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4} md={2}>
              <Typography variant="h6" align='center'>ID</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <Typography variant="h6" align='center'>Fecha</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={3} alignItems="center">
              <Typography variant="h6" align='center'>Vendido Por</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
              <Typography variant="h6" align='center'>Tipo</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <Typography variant="h6" align='center'>ID</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
