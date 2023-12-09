import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function SettingsPage() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Settings</Typography>
      </Stack>
    </Container>
  );
}
