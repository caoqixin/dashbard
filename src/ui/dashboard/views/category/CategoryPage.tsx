'use client';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { categoriesRoot } from '@/lib/_mock/categories';
import TableNoData from '@/ui/components/table/tableNoData';
import TableRow from '@/ui/components/table/tableRow';
import TableHead from '@/ui/components/table/tableHead';
import TableEmptyRows from '@/ui/components/table/tableEmptyRows';
import {
  emptyRows,
  applyFilter,
  getComparator,
  OrderProp,
} from '@/ui/components/table/utils';
import Table from '@/ui/components/table/Table';
import { Stack, TableCell, Typography, TableBody } from '@mui/material';
import NavLink from '@/ui/components/navlink/NavLink';

export default function CategoryPage() {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataFiltered = applyFilter({
    inputData: categoriesRoot,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  // 过滤

  const handleFilterByName = (event: ChangeEvent<HTMLElement>) => {
    setPage(0);
    const target = event.target as HTMLInputElement;
    setFilterName(target.value);
  };
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLElement>) => {
    setPage(0);
    const target = event.target as HTMLInputElement;
    setRowsPerPage(parseInt(target.value, 10));
  };

  const handleSort = (event: MouseEvent<HTMLElement>, id: OrderProp) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== null) {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      const newSelecteds = categoriesRoot.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLElement>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Table
      title="分类管理"
      addTitle="添加分类"
      data={categoriesRoot}
      selectedData={selected}
      filterName={filterName}
      page={page}
      rowsPerPage={rowsPerPage}
      handleFilterByName={handleFilterByName}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    >
      <TableHead
        order={order}
        orderBy={orderBy}
        rowCount={categoriesRoot.length}
        numSelected={selected.length}
        onRequestSort={handleSort}
        onSelectAllClick={handleSelectAllClick}
        headLabel={[{ id: 'name', label: '分类名称' }, { id: '' }]}
      />
      <TableBody>
        {dataFiltered
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow
              key={row.id}
              selected={selected.indexOf(row.name) !== -1}
              handleClick={(event: ChangeEvent<HTMLElement>) =>
                handleClick(event, row.name)
              }
            >
              <TableCell scope="row">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="subtitle2" noWrap>
                    <NavLink
                      href={`/dashboard/category/${row.id}`}
                      sx={{
                        color: 'inherit',
                        fontSize: '20px',
                        textDecoration: 'none',
                      }}
                    >
                      {row.name}
                    </NavLink>
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ))}

        <TableEmptyRows
          height={77}
          emptyRows={emptyRows(page, rowsPerPage, categoriesRoot.length)}
        />

        {notFound && <TableNoData query={filterName} />}
      </TableBody>
    </Table>
  );
}
