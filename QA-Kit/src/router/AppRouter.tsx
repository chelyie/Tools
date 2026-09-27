import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { mainRoutes } from './main/main.route';

const router = createBrowserRouter(mainRoutes);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
