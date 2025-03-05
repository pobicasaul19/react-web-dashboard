import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import pagesData from './pages/pageData';

const router = createBrowserRouter(pagesData)
export function App() {
  return (
    <RouterProvider router={router} />
  );
}

