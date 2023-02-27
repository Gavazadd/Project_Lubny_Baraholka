import {
  ACTIVATE_ROUTE,
  ADMIN_ROUTE,
  CREATE_ROUTE,
  DEVICE_ROUTE, FAVOURITES_ROUTE,
  LOGIN_ROUTE,
  PROFILE_Create_ROUTE,
  PROFILE_Display_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE, USER_DEVICES_ROUTE
} from "./utils/consts";
import AdminPage from "./pages/AdminPage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import DevicePage from "./pages/DevicePage";
import ActivatePage from "./pages/ActivatePage";
import CreateAnnouncement from "./pages/CreateAnnouncementPage";
import ProfileDisplayPage from "./pages/ProfilePages/ProfileDisplayPage";
import ProfileCreatePage from "./pages/ProfilePages/ProfileCreatePage";
import UserDevicesPage from "./pages/UserDevicesPage";
import FavouritesPage from "./pages/FavouritesPage";


export const authRoutes = [
  {
    path: PROFILE_Create_ROUTE,
    Component: ProfileCreatePage
  },
  {
    path: FAVOURITES_ROUTE,
    Component: FavouritesPage
  },
  {
    path: USER_DEVICES_ROUTE,
    Component: UserDevicesPage
  },
]
export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  }
]

export const isInfoRoutes = [
  {
    path: PROFILE_Display_ROUTE,
    Component: ProfileDisplayPage
  },
  {
    path: CREATE_ROUTE,
    Component: CreateAnnouncement
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