import { HEADER, NAV } from '@/config/header';
import { useResponsive } from '@/hooks/use-responsive';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({
  children,
  sx,
  ...other
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
