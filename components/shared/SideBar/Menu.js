import {
  WalletIcon,
  DashboardIcon,
  DashboardBarIcon,
  HistoryBarIcon,
  ActivityLogBarIcon,
  SettingsBarIcon,
  APIKeysIcon,
  CoinBarIcon,
  RtgsBarIcon,
  UserManagementBarIcon,
  CurrencyTabIcon,
} from "../../../icons";
const Coins = {
  mainTitle: "Coin Management",
  title: "Coins",
  classsChange: "mm-collapse",
  to: "/admin/coins",
};
const History = {
  mainTitle: "Coin Management",
  title: "Rolling Reserve",
  classsChange: "mm-collapse",
  to: "/admin/rolling-reserve",
};

const Users = {
  mainTitle: "User Management",
  title: "Users",
  classsChange: "mm-collapse",
  to: "/admin/users",
};
const Admins = {
  mainTitle: "User Management",
  title: "Admins",
  classsChange: "mm-collapse",
  to: "/admin/admins",
};

const UserMenuList = [
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: (
      <DashboardBarIcon className="w-100 h-100" style={{ padding: "1px" }} />
    ),
    to: "dashboard",
  },
  //Accounts
  {
    title: "Accounts",
    classsChange: "mm-collapse",
    iconStyle: <WalletIcon className="w-100 h-100" />,
    to: "accounts",
  },
  // Transaction History
  {
    title: "Transaction History",
    classsChange: "mm-collapse",
    iconStyle: <UserManagementBarIcon className="w-100 h-100" />,
    to: "transaction-history",
  },
  //Settings
  {
    title: "Settings",
    classsChange: "mm-collapse",
    iconStyle: <SettingsBarIcon />,
    to: "settings",
  },
  //Activity
  {
    title: "Activity",
    classsChange: "mm-collapse",
    iconStyle: <ActivityLogBarIcon />,
    to: "activity",
  },
];

const SidebarMenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <DashboardIcon />,
    to: "/admin/dashboard",
  },

  {
    title: "Fiat Management",
    classsChange: "mm-collapse",
    iconStyle: <WalletIcon />,
    to: "/admin/fiat-management",
  },

  {
    title: "Transaction History",
    classsChange: "mm-collapse",
    iconStyle: <HistoryBarIcon />,
    to: "/admin/transaction-history",
  },

  {
    title: "Users",
    subTitle: "Users",
    classsChange: "mm-collapse",
    iconStyle: <UserManagementBarIcon />,
    to: "/admin/users",
  },
  {
    title: "Currency",
    classsChange: "mm-collapse",
    iconStyle: <CurrencyTabIcon className="w-100 h-100" />,
    to: "currency",
  },
  {
    title: "Activity",
    classsChange: "mm-collapse",
    iconStyle: <ActivityLogBarIcon />,
    to: "/admin/activity",
  },

  {
    title: "Settings",
    classsChange: "mm-collapse",
    iconStyle: <SettingsBarIcon />,
    to: "/admin/settings",
  },
];

export const MenuList = {
  user: UserMenuList,
  superAdmin: SidebarMenuList,
  supervisor: SidebarMenuList,
  admin: [...SidebarMenuList],
};
