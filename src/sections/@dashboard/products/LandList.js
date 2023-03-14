import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ListCard from './ListCard';

// ----------------------------------------------------------------------

LandList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function LandList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={12}>
          <ListCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
