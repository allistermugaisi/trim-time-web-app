import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Navbar from './Navbar';
import Filters from './Filters';

const Landing = () => {
	const navigate = useNavigate();

	const [barbers, setBarbers] = useState(null);
	const [currentBarber, setCurrentBarber] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);
	const [loading, setLoading] = useState(true);

	const [searchQuery, setSearchQuery] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

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
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://trim-time-api.onrender.com/barbers?q=${searchQuery}`
				);
				setBarbers(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [searchQuery]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// const filteredData = barbers?.filter((item) =>
	// 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	const handleDialog = (barber) => {
		setCurrentBarber(barber);
		booking_modial.showModal();
	};

	const onSubmit = (data, e) => {
		e.preventDefault();
		setButtonLoading(true);

		const { checkin_date, phone, service } = data;

		const payload = JSON.stringify({
			id: Math.floor(Math.random() * 100000),
			checkin_date,
			phone,
			service,
			client: currentUser,
			amount: currentBarber?.price,
			barber: currentBarber,
			date: new Date().toLocaleDateString(),
			status: 'Awaiting payment',
		});

		fetch('https://trim-time-api.onrender.com/appointments', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: payload,
		})
			.then((res) => {
				toast.success('Your appointment has been booked successfully.');
				setButtonLoading(false);
			})
			.catch((error) => {
				toast.error('Failed to book appointment :' + error.response.message);
				setButtonLoading(false);
			});
	};

	return (
		<>
			<div className="antialiased bg-gray-50 dark:bg-gray-300">
				{/* <!-- Navbar --> */}
				<Navbar />

				<Filters />

				<main className="p-4 md:ml-64 h-screen pt-20">
					<div className="mb-5 flex justify-between items-center">
						<h2 className="text-left text-2xl font-bold">Available barbers</h2>
						<form action="#" method="GET" className="hidden md:block md:pl-2">
							<label htmlFor="topbar-search" className="sr-only">
								Search
							</label>
							<div className="relative w-64 md:w-96">
								<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
									<svg
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										></path>
									</svg>
								</div>
								<input
									type="text"
									name="text"
									value={searchQuery}
									onChange={handleSearchChange}
									id="topbar-search"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Search available barber"
								/>
							</div>
						</form>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-4">
						{loading === false ? (
							barbers?.map((barber, index) => {
								const {
									name,
									imageUrl,
									price,
									rating,
									location,
									clients,
									services,
								} = barber;
								return (
									<div
										key={index}
										className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-96 w-auto md:h-80"
									>
										<div className="m-2">
											<div className="mt-6 flex items-center justify-between">
												<img
													className="w-12 h-12 rounded-full"
													src={imageUrl}
													alt="Rounded avatar"
												/>
												<span className="text-xl font-extrabold">
													Kes {price}.00
												</span>
											</div>
											<div className="mt-4 flex items-center space-x-2">
												<h4 className="text-lg font-bold">{name}</h4>
												<svg
													fill="none"
													className="h-6 w-6 text-[#FD9B1F]"
													stroke="currentColor"
													strokeWidth={1.5}
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
													/>
												</svg>
												<span className="font-bold text-[#FD9B1F]">
													{rating}
												</span>
												<span className="text-sm text-[#FD9B1F]">
													({clients} clients)
												</span>
											</div>
											<div className="mt-4 flex justify-start mx-2">
												<p className="text-gray-600 font-semibold">
													{location}
												</p>
											</div>
											<div className="my-4 flex flex-wrap space-x-2 space-y-1">
												{services.map((service, index) => {
													return (
														<span
															key={index}
															className="bg-[#F6F3F9] p-2 text-xs rounded-lg whitespace-nowrap"
														>
															{service}
														</span>
													);
												})}
											</div>
										</div>
										<div className="mx-2 space-x-3">
											<button
												type="button"
												className="px-8 sm:px-12 py-2.5 text-sm font-medium text-white bg-[#FD9B1F] hover:bg-[#FD9B1F] focus:outline-none rounded-lg text-center"
												onClick={() => handleDialog(barber)}
											>
												Book
											</button>
											<button
												type="button"
												className="px-3 sm:px-8 py-2.5 text-[#FD9B1F] hover:text-white border border-[#FD9B1F] hover:bg-[#FD9B1F] focus:outline-none font-medium rounded-lg text-sm text-center"
											>
												More info
											</button>
										</div>
									</div>
								);
							})
						) : (
							<div className="w-full col-span-3 flex justify-center items-center mt-32">
								<h3>Loading available barbers...</h3>
							</div>
						)}
					</div>
				</main>
			</div>

			{/* <!-- drawer component --> */}
			<dialog id="booking_modial" className="modal">
				<form
					method="dialog"
					onSubmit={handleSubmit(onSubmit)}
					className="modal-box"
				>
					<h3 className="font-bold text-lg">
						Book an appointment with {currentBarber?.name}
					</h3>
					<label
						htmlFor="service"
						className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Type of service
					</label>
					<select
						{...register('service', {
							required: {
								value: true,
								message: 'Type of service is required',
							},
						})}
						id="service"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option defaultValue>Choose a service</option>
						<option defaultValue="Hair + Beard Haircut">
							Hair + Beard Haircut
						</option>
						<option defaultValue="Beard / Head Camo">Beard / Head Camo</option>
						<option defaultValue="Haircut machine">Haircut machine</option>
						<option defaultValue="Beard haircut">Beard haircut</option>
						<option defaultValue="Men's haircut">Men's haircut</option>
						<option defaultValue="Razor shave">Razor shave</option>
						<option defaultValue="Hairstyling">Hairstyling</option>
						<option defaultValue="Stacking">Stacking</option>
					</select>
					{errors?.service && (
						<span className="text-red-500 text-xs">
							{errors?.service?.message}
						</span>
					)}

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

					<div className="mt-4 input-wrapper flex flex-col">
						<label htmlFor="checkin_date" className="input-label">
							Check in date
						</label>
						<input
							{...register('checkin_date', {
								required: {
									value: true,
									message: 'Checkin date is required',
								},
							})}
							type="date"
							name="checkin_date"
							id="checkin_date"
							className="input-field"
						/>
						{errors?.checkin_date && (
							<span className="text-red-500 text-xs">
								{errors?.checkin_date?.message}
							</span>
						)}
					</div>

					<div className="flex justify-center">
						<button
							type="submit"
							disabled={buttonLoading ? true : false}
							className="mt-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
						>
							{buttonLoading ? 'Processing...' : 'Book Now'}
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

export default Landing;
