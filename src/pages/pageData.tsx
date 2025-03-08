import { HomePage } from "./";
import { UserPage } from './user';
import { LoginPage } from "./login";
import { ArticlePage } from "./article"
import { CompanyPage } from './company';
import { MainLayout } from '../layout/MainLayout';
import { routerType } from "../models/RouterTypes";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const withMainLaout = (element: JSX.Element) => {
  return (
    <MainLayout>
      {element}
    </MainLayout>
  );
}

const pagesData: routerType[] = [
  {
    path: '/',
    element: (
      <AuthMiddleware>
        {withMainLaout(<HomePage />)}
      </AuthMiddleware>
    )
  },
  {
    path: '/articles',
    element: (
      <AuthMiddleware>
        {withMainLaout(<ArticlePage />)}
      </AuthMiddleware>
    )
  },
  {
    path: '/companies',
    element: (
      <AuthMiddleware>
        {withMainLaout(<CompanyPage />)}
      </AuthMiddleware>
    )
  },
  {
    path: '/users',
    element: (
      <AuthMiddleware>
        {withMainLaout(<UserPage />)}
      </AuthMiddleware>
    )
  },
  {
    path: '/account/login',
    element: <LoginPage />,
  },
];

export default pagesData;