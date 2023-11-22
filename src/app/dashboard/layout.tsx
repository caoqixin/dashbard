'use client';

import ThemeProvider from '@/theme';
import Main from '@/ui/dashboard/Main';
import Header from '@/ui/dashboard/header/Header';
import SideBar from '@/ui/dashboard/sidebar/SideBar';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <ThemeProvider>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <SideBar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </ThemeProvider>
  );
}
