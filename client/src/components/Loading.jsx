import { Backdrop, CircularProgress } from '@mui/material';

function Loading({loading}) {
  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  )
}

export default Loading