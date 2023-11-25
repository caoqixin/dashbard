'use client';
import ThemeProvider from '@/theme';
import { useState } from 'react';
import Header from './header/Header';
import { Box } from '@mui/material';
import SideBar from './sidebar/SideBar';
import Main from './Main';

const Dashboard = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
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
};

export default Dashboard;
