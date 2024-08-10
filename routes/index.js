import { lazy } from "react";
import {
  Routes,
  AdminRoutes,
  GenericConstant,
  GENERIC_CONSTANTS,
} from "../utils/Constants";
import { allowedRoles } from "../config";
const Login = lazy(() => lazyRetry(() => import("../pages/auth/Login")));
const Register = lazy(() => lazyRetry(() => import("../pages/auth/Register")));
const SetPassword = lazy(() =>
  lazyRetry(() => import("../pages/auth/SetPassword"))
);
const Verify2FA = lazy(() =>
  lazyRetry(() => import("../pages/auth/Verify2FA"))
);
const ResetPassword = lazy(() =>
  lazyRetry(() => import("../pages/auth/ResetPassword"))
);
const ForgotPassword = lazy(() =>
  lazyRetry(() => import("../pages/auth/ForgotPassword"))
);
const Dashboard = lazy(() =>
  lazyRetry(() => import("../pages/user/dashboard"))
);
const ScheduleMeeting = lazy(() =>
  lazyRetry(() => import("../pages/auth/ScheduleMeeting"))
);
const AdminDashboard = lazy(() =>
  lazyRetry(() => import("../pages/admin/dashboard"))
);
// const AdminAdmins = lazy(() =>
//   lazyRetry(() => import("../pages/admin/admins"))
// );

const AdminFiatManagement = lazy(() =>
  lazyRetry(() => import("../pages/admin/FiatManagement"))
);
const AdminUsers = lazy(() => lazyRetry(() => import("../pages/admin/users")));

// const AdminCoinManagement = lazy(() =>
//   lazyRetry(() => import("../pages/admin/coinManagement/coins"))
// );
// const AdminHistoryManagement = lazy(() =>
//   lazyRetry(() => import("../pages/admin/coinManagement/history"))
// );
const AdminTransactionHistory = lazy(() =>
  lazyRetry(() => import("../pages/admin/transactionHistory"))
);
// const RtgsImt = lazy(() => lazyRetry(() => import("../pages/admin/rtgsImt")));
// const APIKeys = lazy(() => lazyRetry(() => import("../pages/admin/apikeys")));
const AdminActivities = lazy(() =>
  lazyRetry(() => import("../pages/admin/Activities"))
);
const AdminAccountSetting = lazy(() =>
  lazyRetry(() => import("../pages/admin/accountSetting"))
);
const AdminCurrency = lazy(() =>
  lazyRetry(() => import("../pages/admin/currency"))
);

const TransactionFee = lazy(() =>
  lazyRetry(() => import("../pages/admin/transactionFee"))
);

const Accounts = lazy(() => lazyRetry(() => import("../pages/user/accounts")));

// const TransactionHistory = lazy(() =>
//   lazyRetry(() => import("../pages/user/transactionHistory"))
// );
const Activities = lazy(() =>
  lazyRetry(() => import("../pages/user/activities"))
);
// const ChangeEmailVerify = lazy(() =>
//   lazyRetry(() => import("../pages/user/changeEmail"))
// );

const AccountSetting = lazy(() =>
  lazyRetry(() => import("../pages/user/accountSetting"))
);
const TransactionHistory = lazy(() =>
  lazyRetry(() => import("../pages/user/transactionHistory"))
);

// a function to retry loading a chunk to avoid chunk load error for out of date code
const lazyRetry = function (componentImport) {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem("retry-lazy-refreshed") || "false"
    );
    // try to import the component
    componentImport()
      .then((component) => {
        window.sessionStorage.setItem("retry-lazy-refreshed", "false"); // success so reset the refresh
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem("retry-lazy-refreshed", "true"); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }
        console.log("error in lazyRetry>", error);
        // reject(error); // Default error behaviour as already tried refresh
      });
  });
};

const getAuthRoutes = () => {
  const routes = [
    {
      path: Routes.LOGIN,
      element: <Login />,
    },
    {
      path: Routes.SET_PASSWORD,
      element: <SetPassword />,
    },
    {
      path: Routes.CONFIRMATION,
      element: <SetPassword />,
    },
    {
      path: Routes.VERIFY_2FA,
      element: <Verify2FA />,
    },
    {
      path: Routes.FORGOT_PASSWORD,
      element: <ForgotPassword />,
    },
    {
      path: Routes.RESET_PASSWORD,
      element: <ResetPassword />,
    },
    {
      path: Routes.SCHEDULE_MEETING,
      element: <ScheduleMeeting />,
    },
  ];

  if (allowedRoles.includes(GenericConstant._USER)) {
    routes.push({
      path: Routes.REGISTER,
      element: <Register />,
    });
  }

  console.log("routes", routes);

  return routes;
};

const routes = [
  {
    path: Routes.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: Routes.ACCOUNTS,
    element: <Accounts />,
  },
  {
    path: Routes.SETTINGS,
    element: <AccountSetting />,
  },
  {
    path: Routes.ACTIVITY,
    element: <Activities />,
  },
  {
    path: Routes.TRANSACTION_HISTORY,
    element: <TransactionHistory />,
  },
  // {
  //   path: Routes.ACTIVITY,
  //   element: <Activities />,
  // },
  // {
  //   path: Routes.CHANGE_EMAIL_VERIFY,
  //   element: <ChangeEmailVerify />,
  // },
];

const adminRoutes = [
  {
    path: AdminRoutes.DASHBOARD,
    element: <AdminDashboard />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
  {
    path: Routes.CURRENCY,
    element: <AdminCurrency />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
  // {
  //   path: AdminRoutes.ADMINS,
  //   element: <AdminAdmins />,
  //   roles: [GenericConstant._SUPERVISOR],
  // },
  {
    path: AdminRoutes.FIAT_MANAGEMENT,
    element: <AdminFiatManagement />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
  {
    path: AdminRoutes.USERS,
    element: <AdminUsers />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },

  // {
  //   path: AdminRoutes.COINS,
  //   element: <AdminCoinManagement />,
  //   roles: [GenericConstant._SUPERVISOR, GenericConstant._ADMIN],
  // },
  // {
  //   path: AdminRoutes.ROLLING_RESERVE,
  //   element: <AdminHistoryManagement />,
  //   roles: [GenericConstant._SUPERVISOR, GenericConstant._ADMIN],
  // },
  {
    path: AdminRoutes.TRANSACTION_HISTORY,
    element: <AdminTransactionHistory />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
  // {
  //   path: AdminRoutes.RTGS_IMT,
  //   element: <RtgsImt />,
  //   roles: [GenericConstant._SUPERVISOR, GenericConstant._ADMIN],
  // },
  // {
  //   path: AdminRoutes.API_KEYS,
  //   element: <APIKeys />,
  //   roles: [GenericConstant._SUPERVISOR, GenericConstant._ADMIN],
  // },
  {
    path: AdminRoutes.ACTIVITY,
    element: <AdminActivities />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
  {
    path: AdminRoutes.SETTINGS,
    element: <AdminAccountSetting />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
  {
    path: AdminRoutes.TRANSACTION_FEE,
    element: <TransactionFee />,
    roles: [
      GenericConstant._SUPERVISOR,
      GenericConstant._SUPER_ADMIN,
      GenericConstant._ADMIN,
    ],
  },
];

export { getAuthRoutes, routes, adminRoutes };
