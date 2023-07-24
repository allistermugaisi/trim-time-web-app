import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Appointments = () => {
	const navigate = useNavigate();

	const [buttonLoading, setButtonLoading] = useState(false);

	const [currentUser, setCurrentUser] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [currentAppointment, setCurrentAppointment] = useState([]);
	const [loading, setLoading] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://trim-time-api.onrender.com/appointments'
				);
				setAppointments(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	const handleDialog = (appointment) => {
		setCurrentAppointment(appointment);
		payment_modal.showModal();
	};

	const onSubmit = (data, e) => {
		e.preventDefault();
		setButtonLoading(true);

		const { phone, amount } = data;

		const payload = JSON.stringify({
			BusinessShortCode: '174379',
			Msisdn: `254${parseInt(phone)}`,
			Amount: amount,
		});

		const paymentPayload = JSON.stringify({
			id: Math.floor(Math.random() * 100000),
			BusinessShortCode: '174379',
			Msisdn: `254${parseInt(phone)}`,
			Amount: amount,
			client: currentUser,
			appointment: currentAppointment,
			date: new Date().toLocaleDateString(),
			status: 'Paid',
		});

		fetch(
			'https://node-payment-simulation.onrender.com/api/v1/payments/stkpush',
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: payload,
			}
		)
			.then((res) => {
				toast.success(
					'Payment STKPush request successful! Kindly check your phone.'
				);
				setButtonLoading(false);
			})
			.catch((error) => {
				toast.error('Failed to pay for appointment :' + error.response.message);
				setButtonLoading(false);
			});

		fetch('https://trim-time-api.onrender.com/payments', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: paymentPayload,
		})
			.then((res) => {
				console.log(res);
				toast.success('Your payment is successful.');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
				<div className="max-w-7xl overflow-hidden mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
								<tr>
									<td className="px-4 py-3">Booking ID</td>
									<td className="px-4 py-3">Customer Name</td>
									<td className="px-4 py-3">Customer phone</td>
									<td className="px-4 py-3">Barber name</td>
									<td className="px-4 py-3">Service</td>
									<td className="px-4 py-3">Amount Paid</td>
									<td className="px-4 py-3">Location</td>
									<td className="px-4 py-3">Date</td>
									<td className="px-4 py-3">Time</td>
									<td className="px-4 py-3">Action</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
								{appointments?.map((appointment) => {
									const {
										id,
										barber,
										client,
										phone,
										service,
										amount,
										checkin_date,
										time,
										status,
									} = appointment;

									return (
										<tr key={id} role="button">
											<td className="px-4 py-3">
												<span className="text-sm">{id}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{client?.name}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{phone}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{barber?.name}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{service}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">
													{formatter.format(amount)}
												</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{barber?.location}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{checkin_date}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{time}hrs</span>
											</td>
											{/* <td className="px-4 py-3">
												<span
													className={
														status === 'Scheduled'
															? 'text-sm text-green-500'
															: 'text-sm text-red-500'
													}
												>
													{status}
												</span>
											</td> */}
											<td className="px-4 py-3">
												<button
													onClick={() => handleDialog(appointment)}
													className="mt-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
												>
													Pay now
												</button>
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
			<dialog id="payment_modal" className="modal">
				<form
					method="dialog"
					onSubmit={handleSubmit(onSubmit)}
					className="modal-box"
				>
					<h3 className="font-bold text-lg">
						Pay for your appointment (Booking id: {currentAppointment?.id})
					</h3>

					<div>
						<label
							htmlFor="phone"
							className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Mpesa number
						</label>
						<input
							{...register('phone', {
								required: {
									value: true,
									message: 'Phone number is required',
								},
								pattern: {
									value: /^(\+254|0)[1-9]\d{8}$/i,
									message: 'Please enter a valid mobile number',
								},
							})}
							type="number"
							id="phone"
							name="phone"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="0700111222"
						/>
						{errors?.phone && (
							<span className="text-red-500 text-xs">
								{errors?.phone?.message}
							</span>
						)}
					</div>

					<div>
						<label
							htmlFor="amount"
							className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Amount
						</label>
						<input
							{...register('amount', {
								required: {
									value: true,
									message: 'Amount is required',
								},
							})}
							type="number"
							id="amount"
							name="amount"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="500"
						/>
						{errors?.amount && (
							<span className="text-red-500 text-xs">
								{errors?.amount?.message}
							</span>
						)}
					</div>

					<div className="flex justify-center">
						<button
							type="submit"
							className="mt-6 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
							disabled={buttonLoading ? true : false}
						>
							<img
								className="w-auto h-10 mr-2 -ml-1"
								src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689324487/mpesa/MicrosoftTeams-image_41_b93lyy.jpg"
								alt=""
							/>
							{buttonLoading ? 'Processing...' : 'Pay with Mpesa Express'}
						</button>
					</div>

					<p className="mt-4 text-center text-gray-500 dark:text-gray-400">
						Please press{' '}
						<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
							Esc
						</kbd>
						key to close
					</p>
				</form>
			</dialog>

			<Toaster position="top-center" />
		</>
	);
};

export default Appointments;

// const appointments = [
// 	{
// 		id: 0,
// 		customer_id: '092EUHDA23',
// 		customer_name: 'John Doe',
// 		email: 'johndoe@example.com',
// 		barber_name: 'Keith Miller',
// 		price: 17100,
// 		location: 'Mombasa, Kenya',
// 		date: 'Friday, 14 July 2023',
// 		status: 'Scheduled', // Waiting, Scheduled
// 	},
// ];

const formatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
