// import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { routerType } from "../models/RouterTypes";
import { LoginPage } from "./login";
import { HomePage } from "./";

const pagesData: routerType[] = [
  {
    path: '/',
    element: (
      <AuthMiddleware>
        <HomePage />
      </AuthMiddleware>
    )
  },
  {
    path: '/account/login',
    element: <LoginPage />,
  },
];

export default pagesData;