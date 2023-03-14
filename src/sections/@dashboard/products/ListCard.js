import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Grid, Divider, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

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
  const calculatePricePerMeter = (price, size) => {
    const sizeNumber = Number(size.replace('mts', ''))
    return (price / sizeNumber).toFixed(2);
  }

  const { name, address, price, size, status } = product;
  let color = 'info'
  const { town, city, country, state, number, square, street, zip} = address;
  switch(status) {
    case 'DISPONIBLE':
      color = 'success';
      break;
    case 'VENDIDO':
      color = 'primary';
      break;
    case 'INVADIDO':
      color = 'error';
      break;
    case 'LIQUIDADO':
      color = 'warning';
      break;
    default:
      color = 'info';
      break;
  };
  

  return (
    <Card style={{ border: `2px solid`, boxShadow: "5px 10px" }} >
      
      <Grid container spacing={3} sx={{ m: 3 }}>
        <Grid md={5}>
          <Link color="inherit" underline="hover">
            <Typography variant="subtitle2" noWrap fontSize={20}>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> 
              {street} Mz{square} Lt{number}, {town}, {zip} {city}, {state}, {country}
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
    </Card>
  );
}
