import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
	const [currentUser, setCurrentUser] = useState([]);
	const [payments, setPayments] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let email = sessionStorage.getItem('email');
		let user_type = sessionStorage.getItem('user_type');

		if (email === '' || email === null) {
			navigate('/auth/login');
		}

		if (user_type === 'barber') {
			fetch(`https://trim-time-api.onrender.com/barbers?email=${email}`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					setCurrentUser(res[0]);
				})
				.catch((error) => {
					toast.error('Failed to fetch current user' + error.response.message);
				});
		} else {
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
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (currentUser.type === 'owner') {
					const response = await axios.get(
						'https://trim-time-api.onrender.com/payments'
					);
					setPayments(response.data);
					setLoading(false);
				} else if (currentUser.type === 'client') {
					const response = await axios.get(
						`https://trim-time-api.onrender.com/payments?client.email=${currentUser.email}`
					);
					setPayments(response.data);
					setLoading(false);
				} else {
					const response = await axios.get(
						`https://trim-time-api.onrender.com/payments?appointment.barber.id=${currentUser.id}`
					);
					setPayments(response.data);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [currentUser]);

	return (
		<>
			{payments?.length > 0 ? (
				<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
					<div className="max-w-7xl overflow-hidden mb-8">
						<div className="w-full overflow-x-auto no-scrollbar">
							<table className="w-full whitespace-nowrap">
								<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
									<tr>
										<td className="px-4 py-3">Transaction ID</td>
										<td className="px-4 py-3">Customer Name</td>
										<td className="px-4 py-3">Payment Phone</td>
										<td className="px-4 py-3">Paybill</td>
										<td className="px-4 py-3">Barber Name</td>
										<td className="px-4 py-3">Type of Service</td>
										<td className="px-4 py-3">Total Amount Paid</td>
										<td className="px-4 py-3">Date</td>
										<td className="px-4 py-3">Status</td>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
									{payments?.map((payment) => {
										const {
											id,
											BusinessShortCode,
											Msisdn,
											client,
											appointment,
											Amount,
											date,
											status,
										} = payment;

										return (
											<tr
												key={id}
												role="button"
												onClick={() => setShowModal(true)}
											>
												<td className="px-4 py-3">
													<span className="text-sm">{id}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{client?.name}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{Msisdn}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{BusinessShortCode}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">
														{appointment?.barber?.name}
													</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">
														{appointment?.service}
													</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">
														{formatter.format(Amount)}
													</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{date}</span>
												</td>
												<td className="px-4 py-3">
													<span
														className={
															status === 'Paid'
																? 'text-sm text-green-500'
																: status === 'Refund'
																? 'text-sm text-gray-500'
																: 'text-sm text-red-500'
														}
													>
														{status}
													</span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
							<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
								<span className="flex items-center font-semibold tracking-wide uppercase">
									Showing 1-5 of 25
								</span>
								<div className="flex mt-2 sm:mt-auto sm:justify-end"></div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center mt-32">
					<h3>You have no payments</h3>
				</div>
			)}
		</>
	);
};

export default Payments;

const formatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
