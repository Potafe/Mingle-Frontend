import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import Landingpage from './pages/Landingpage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Chats from './pages/Chats'
import Groups from './pages/Groups'
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';


export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			errorElement: <NotFoundPage />,
			element: (
				<ProtectedRoute>
					<App />
				</ProtectedRoute>
			),
			children: [
				{
					path: '/chats',
					element: <Chats />,
					children: [
						{
							index: true,
							element: <Landingpage title='Chats' />,
						},
					],
				},
				{
					path: '/groups',
					element: <Groups />,
					children: [
						{
							index: true,
							element: <Landingpage title='Groups' />,
						},
					],
				},
			],
		},
		{
			path: '/signup',
			element: <SignupPage />,
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/logout',
			element: <Logout />
		}
	]);

	return <RouterProvider router={route} />;
}