'use client';
import {
  Button,
  Card,
  Container,
  Stack,
  TableContainer,
  TablePagination,
  Typography,
  Table as MuiTable,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TableProps } from '@/lib/definitions';
import TableToolbar from './tableToolbar';
import { ScrollBar } from '../scrollbar/SrollBar';
import NavLink from '../navlink/NavLink';

const Table = ({
  title,
  addTitle,
  back,
  data,
  selectedData,
  filterName,
  handleFilterByName,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  children,
}: TableProps) => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">{title}</Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          {back && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<ArrowBackIcon />}
            >
              <NavLink href={back} sx={{ color: 'inherit' }}>
                返回
              </NavLink>
            </Button>
          )}
          <Button variant="contained" color="inherit" startIcon={<AddIcon />}>
            {addTitle}
          </Button>
        </Box>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selectedData.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <ScrollBar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <MuiTable sx={{ minWidth: 800 }}>{children}</MuiTable>
          </TableContainer>
        </ScrollBar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default Table;
