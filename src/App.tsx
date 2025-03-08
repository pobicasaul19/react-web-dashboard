import pagesData from './pages/pageData';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from '@toolpad/core/useNotifications';

const router = createBrowserRouter(pagesData)
export function App() {
  return (
    <NotificationsProvider>
        <RouterProvider router={router} />
    </NotificationsProvider>
  );
}

