import { BrowserRouter } from 'react-router';
import AppRoutes from './appRoutes';

export default function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


