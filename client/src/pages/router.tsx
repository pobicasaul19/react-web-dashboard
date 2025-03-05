import { Route, Routes } from "react-router-dom";
import { routerType } from "../models/RouterTypes";
import pagesData from "./pageData";
const Router = () => {
  const pageRoutes = pagesData.map(({ path, element }: routerType) => {
    return <Route path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;