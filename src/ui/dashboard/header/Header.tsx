import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useResponsive } from '@/hooks/use-responsive';
import { NAV, HEADER } from '@/config/header';
import { bgBlur } from '@/theme/css';
import AccountPopover from '@/ui/components/popover/AccountPopover';
import Search from '@/ui/components/search/Search';
import { AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {!lgUp && (
          <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Search />

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
