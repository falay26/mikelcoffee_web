import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//Components
import PersistLogin from "./components/olds/PersistLogin";
import RequireAuth from "./components/olds/RequireAuth";
import Missing from "./components/olds/Missing";
import Unauthorized from "./components/olds/Unauthorized";
import Share from "./components/olds/Share";
import Campaign from "./components/olds/Campaign";
//Screens
import Home from "./screens/HomeScreen";
import Admin from "./screens/AdminScreen";
import Panel from "./screens/PanelScreen";
import Branches from "./screens/BranchesScreen";
import Products from "./screens/ProductsScreen";
import Stories from "./screens/StoriesScreen";
import Campaigns from "./screens/CampaignsScreen";
import Notifications from "./screens/NotificationsScreen";
import Supports from "./screens/SupportsScreen";
import Franchises from "./screens/FranchisesScreen";
import Orders from "./screens/OrdersScreen";
//TODO: Transections and Orders
//Constants
import Roles from "./constants/Roles";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "share",
      element: <Share />,
    },
    {
      path: "campaign",
      element: <Campaign />,
    },
    {
      path: "privacy_policy",
      element: null, //This is for privacy policy or other terms..
    },
    {
      path: "admin",
      element: <Admin />,
    },
    {
      element: <PersistLogin />,
      children: [
        {
          element: <RequireAuth allowedRoles={[Roles.Admin]} />,
          children: [
            {
              path: "panel",
              element: <Panel />,
            },
            {
              path: "branches",
              element: <Branches />,
            },
            {
              path: "products",
              element: <Products />,
            },
            {
              path: "stories",
              element: <Stories />,
            },
            {
              path: "campaigns",
              element: <Campaigns />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "supports",
              element: <Supports />,
            },
            {
              path: "franchises",
              element: <Franchises />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
            //Other screen will be added here.
          ],
        },
      ],
    },
    {
      path: "/*",
      element: <Missing />,
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
