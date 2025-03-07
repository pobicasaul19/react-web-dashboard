import { Skeleton, Box } from '@mui/material';

export function SkeletonCard() {
  return (
    <>
      <Skeleton variant="rectangular" width={'100%'} height={250} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="20%" />
        <Skeleton />
      </Box>
    </>
  )
}