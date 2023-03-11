import { Snackbar, Alert, Stack } from '@mui/material';
import PropTypes from 'prop-types';

AlertMessage.propTypes = {
  alertProps: PropTypes.object
}

export default function AlertMessage({ alertProps }) {
  const { show = true, type, message, handleClose } = alertProps;
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
