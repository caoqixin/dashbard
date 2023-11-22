'use client';
import NavLink from '@/ui/components/navlink/NavLink';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
export default function NotFound() {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Sorry, page not found!
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>
          </Box>
          <Image
            src="/illustration_404.svg"
            alt="NotFound"
            height={260}
            width={260}
          />

          <Button
            href="/dashboard"
            size="large"
            variant="contained"
            component={NavLink}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}
