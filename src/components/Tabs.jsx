import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Tabs = () => {
	let location = useLocation();

	const [currentUser, setCurrentUser] = useState([]);

	useEffect(() => {
		let email = sessionStorage.getItem('email');

		if (email === '' || email === null) {
			navigate('/auth/login');
		}

		fetch(`https://trim-time-api.onrender.com/users?email=${email}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setCurrentUser(res[0]);
			})
			.catch((error) => {
				toast.error('Failed to fetch current user' + error.response.message);
			});
	}, []);

	return (
		<div className="mt-20 flex justify-center">
			<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px">
					{currentUser?.type === 'owner' && (
						<>
							<li className="mr-2">
								<Link
									to="/dashboard/brands"
									className={
										location?.pathname === '/dashboard/clients'
											? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
											: 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
									}
								>
									Brands
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
						</>
					)}

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
				</ul>
			</div>
		</div>
	);
};

export default Tabs;
