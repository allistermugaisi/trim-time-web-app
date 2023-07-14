import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';

const DashboardLayout = () => {
	return (
		<>
			<Navbar />
			<Tabs />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default DashboardLayout;
