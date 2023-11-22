import React, { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import {
  createTheme,
  ThemeProvider as MUIThemeProvide,
  Theme,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme: Theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvide theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvide>
  );
}
