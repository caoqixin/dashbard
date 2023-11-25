'use client';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { NAV } from '@/config/header';
import { usePathname } from 'next/navigation';
import { useResponsive } from '@/hooks/use-responsive';
import { MenuItem, menuItems } from '@/config/sidebar';
import { ScrollBar } from '@/ui/components/scrollbar/SrollBar';
import NavLink from '@/ui/components/navlink/NavLink';
import { auth } from '@/lib/auth';

// ----------------------------------------------------------------------

export default function SideBar({
  openNav,
  onCloseNav,
}: {
  openNav: boolean;
  onCloseNav: () => void;
}) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().then((data) => {
      setUser(data?.user);
    });
  }, []);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <ScrollBar
            sx={{
              height: 1,
              '& .simplebar-content': {
                height: 1,
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}

            <Box
              sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Avatar src={user?.image} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">{user?.name}</Typography>
              </Box>
            </Box>

            <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
              {menuItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </Stack>
          </ScrollBar>
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          <ScrollBar
            sx={{
              height: 1,
              '& .simplebar-content': {
                height: 1,
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}

            <Box
              sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Avatar src={user?.image} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">{user?.name}</Typography>
              </Box>
            </Box>

            <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
              {menuItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </Stack>
          </ScrollBar>
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={NavLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
