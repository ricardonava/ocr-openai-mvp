import { createBrowserRouter } from 'react-router-dom';
import EmployeeListPage from '../pages/EmployeeListPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EmployeeListPage />,
  },
  {
    path: '/employee/:id',
    element: <EmployeeDetailPage />,
  },
]);

export default router;
