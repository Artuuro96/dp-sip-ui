import {
	CircularProgress,
	Backdrop,
} from '@mui/material'
import PropTypes from 'prop-types';


Loader.propTypes = {
  show: PropTypes.bool
}

export default function Loader({ show = true }) {
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}