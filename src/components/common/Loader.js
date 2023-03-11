import { PropTypes } from 'prop-types';
import {
	CircularProgress,
	Backdrop,
} from '@mui/material'

Loader.propTypes = {
	loading: PropTypes.bool,
}

export default function Loader({loading}) {
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}