import { createBrowserRouter } from 'react-router-dom';
import EmployeeListPage from '../pages/EmployeeListPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';
import AIScannerPage from '../pages/AIScannerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EmployeeListPage />,
  },
  {
    path: '/employee/:id',
    element: <EmployeeDetailPage />,
  },
  {
    path: '/ai-scanner',
    element: <AIScannerPage />,
  },
]);

export default router;
