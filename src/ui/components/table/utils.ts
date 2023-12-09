export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

interface DemoProps {
  avatarUrl: string;
  company: string;
  id: string;
  isVerified: boolean;
  name: string;
  role: string;
  status: string;
}

export type OrderProp =
  | 'avatarUrl'
  | 'company'
  | 'id'
  | 'isVerified'
  | 'name'
  | 'role'
  | 'status';

type stabilizedThisProp = [DemoProps, number];

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
): number {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(
  a: DemoProps,
  b: DemoProps,
  orderBy: OrderProp
): number {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order: string, orderBy: OrderProp) {
  return order === 'desc'
    ? (a: DemoProps, b: DemoProps) => descendingComparator(a, b, orderBy)
    : (a: DemoProps, b: DemoProps) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: DemoProps[];
  comparator: (a: DemoProps, b: DemoProps) => number;
  filterName: string;
}) {
  const stabilizedThis: stabilizedThisProp[] = inputData.map(
    (el: DemoProps, index: number): stabilizedThisProp => [el, index]
  );

  stabilizedThis.sort(
    (a: stabilizedThisProp, b: stabilizedThisProp): number => {
      const order: number = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    }
  );

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
