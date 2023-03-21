import {
	CircularProgress,
	Backdrop,
} from '@mui/material'

export default function Loader() {
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Boolean(true)}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}