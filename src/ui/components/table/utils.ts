import { CategoryType } from '@/lib/definitions';

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

type InputDataProps = DemoProps | CategoryType;
export type CategoryOrderByProp = 'id' | 'name';
export type OrderProp =
  | 'avatarUrl'
  | 'company'
  | 'id'
  | 'isVerified'
  | 'name'
  | 'role'
  | 'status';

export type OrderByProps = OrderProp | CategoryOrderByProp;

type stabilizedThisProp = [InputDataProps, number];

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
): number {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(
  a: InputDataProps,
  b: InputDataProps,
  orderBy: any
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

export function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: InputDataProps, b: InputDataProps) =>
        descendingComparator(a, b, orderBy)
    : (a: InputDataProps, b: InputDataProps) =>
        -descendingComparator(a, b, orderBy);
}

export function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: InputDataProps[];
  comparator: (a: InputDataProps, b: InputDataProps) => number;
  filterName: string;
}) {
  const stabilizedThis: stabilizedThisProp[] = inputData.map(
    (el: InputDataProps, index: number): stabilizedThisProp => [el, index]
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
