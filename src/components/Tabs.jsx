import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Tabs = () => {
	let location = useLocation();
	console.log(location?.pathname);

	return (
		<div className="mt-20 flex justify-center">
			<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px">
					<li className="mr-2">
						<Link
							to="/dashboard/clients"
							className={
								location?.pathname === '/dashboard/clients'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
						>
							Clients
						</Link>
					</li>
					<li className="mr-2">
						<Link
							to="/dashboard/barbers"
							className={
								location?.pathname === '/dashboard/barbers'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
							aria-current="page"
						>
							Barbers
						</Link>
					</li>
					<li className="mr-2">
						<Link
							to="/dashboard/appointments"
							className={
								location?.pathname === '/dashboard/appointments'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
						>
							Appointments
						</Link>
					</li>
					<li className="mr-2">
						<Link
							to="/dashboard/payments"
							className={
								location?.pathname === '/dashboard/payments'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
						>
							Payments
						</Link>
					</li>
					<li className="mr-2">
						<Link
							to="/dashboard/reviews"
							className={
								location?.pathname === '/dashboard/reviews'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
						>
							Reviews
						</Link>
					</li>
					<li className="mr-2">
						<Link
							to="/dashboard/profile"
							className={
								location?.pathname === '/dashboard/profile'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
						>
							Profile
						</Link>
					</li>
					{/* <li className="mr-2">
						<Link
							to="/dashboard/notifications"
							className={
								location?.pathname === '/dashboard/notifications'
									? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
									: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}
						>
							Notifications
						</Link>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default Tabs;
