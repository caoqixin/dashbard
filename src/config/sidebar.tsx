import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AndroidIcon from '@mui/icons-material/Android';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CategoryIcon from '@mui/icons-material/Category';
import HandymanIcon from '@mui/icons-material/Handyman';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExtensionIcon from '@mui/icons-material/Extension';
import React from 'react';

export type MenuItem = {
  id: number;
  title: string;
  path: string;
  icon?: React.ReactElement;
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: '客户管理',
    path: '/dashboard/user',
    icon: <ManageAccountsIcon />,
  },
  {
    id: 3,
    title: '订单管理',
    path: '/dashboard/order',
    icon: <ReceiptIcon />,
  },
  {
    id: 4,
    title: '手机维修',
    path: '/dashboard/repair',
    icon: <PhoneIphoneIcon />,
  },
  {
    id: 5,
    title: '配件管理',
    path: '/dashboard/component',
    icon: <ExtensionIcon />,
  },
  {
    id: 6,
    title: '保修管理',
    path: '/dashboard/warranty',
    icon: <HandymanIcon />,
  },
  {
    id: 7,
    title: '报价平台',
    path: '/dashboard/platform',
    icon: <AccountBalanceIcon />,
  },
  {
    id: 8,
    title: '手机型号',
    path: '/dashboard/phone',
    icon: <AndroidIcon />,
  },
  {
    id: 9,
    title: '系统设置',
    path: '/dashboard/settings',
    icon: <SettingsIcon />,
  },
  {
    id: 10,
    title: '分类管理',
    path: '/dashboard/category',
    icon: <CategoryIcon />,
  },
  {
    id: 11,
    title: '供应商管理',
    path: '/dashboard/supplier',
    icon: <PersonIcon />,
  },
];
