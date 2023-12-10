'use client';
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  TableCell,
  Popover,
  TableRow as MuiTableRow,
  MenuItem,
  IconButton,
} from '@mui/material';

interface TableRowProps {
  selected: boolean;
  children: ReactNode;
  handleClick: (event: ChangeEvent<HTMLElement>) => void;
}

export default function TableRow({
  selected,
  children,
  handleClick,
}: TableRowProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'table-row-popover' : undefined;

  return (
    <>
      <MuiTableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        {children}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </MuiTableRow>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 140,
            },
          },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <EditIcon sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <DeleteOutlineOutlinedIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
