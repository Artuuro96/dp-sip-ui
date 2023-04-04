import {
	CircularProgress,
	Backdrop,
} from '@mui/material'
import PropTypes from 'prop-types';


Loader.propTypes = {
  show: PropTypes.bool
}

export default function Loader({ show }) {
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}