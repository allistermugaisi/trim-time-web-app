import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

// layouts
import { RootLayout, AuthLayout, DashboardLayout } from './layouts';

import {
	Landing,
	Login,
	Register,
	Clients,
	Barbers,
	Profile,
	Payments,
	Reviews,
	Rewards,
	Appointments,
	Notifications,
} from './components';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Landing />} />
			<Route path="dashboard" element={<DashboardLayout />}>
				<Route path="clients" element={<Clients />} />
				<Route path="barbers" element={<Barbers />} />
				<Route path="profile" element={<Profile />} />
				<Route path="payments" element={<Payments />} />
				<Route path="reviews" element={<Reviews />} />
				<Route path="rewards" element={<Rewards />} />
				<Route path="appointments" element={<Appointments />} />
				<Route path="notifications" element={<Notifications />} />
			</Route>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
