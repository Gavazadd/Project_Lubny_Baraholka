import AdminPage from "./pages/AdminPage";
import {
  ACTIVATE_ROUTE,
  ADMIN_ROUTE,
  CREATE_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE, PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE
} from "./utils/consts";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import DevicePage from "./pages/DevicePage";
import ActivatePage from "./pages/ActivatePage";
import CreateAnnouncement from "./pages/CreateAnnouncementPage";
import ProfilePage from "./pages/ProfilePage";

export const authRoutes = [
  {
    path: CREATE_ROUTE,
    Component: CreateAnnouncement
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage
  }
]
export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  }
]

export const publicRoutes = [
  {
    path: ACTIVATE_ROUTE,
    Component: ActivatePage
  },
  {
    path: SHOP_ROUTE,
    Component: ShopPage
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage
  },
]