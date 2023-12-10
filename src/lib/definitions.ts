// 类型定义文件

import { ChangeEvent, MouseEvent, ReactNode } from 'react';

// 分类类型
export interface CategoryType {
  id: number;
  name: string;
}

export interface Categories {
  id: number;
  name: string;
  type_id: number;
}

// 表格属性
export interface TableRowProps {
  selected: boolean;
  rows: CategoryType | Categories;
  handleClick: (event: ChangeEvent<HTMLElement>) => void;
}

export interface TableProps {
  title: string;
  back?: string;
  addTitle?: string;
  data: Array<any>;
  children: ReactNode;
  selectedData: string[];
  filterName: string;
  handleFilterByName: (event: ChangeEvent<HTMLElement>) => void;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLElement>) => void;
}
