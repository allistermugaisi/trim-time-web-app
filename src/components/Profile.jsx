import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Profile = () => {
	const navigate = useNavigate();

	const [buttonLoading, setButtonLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState([]);

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

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	useEffect(() => {
		reset({
			name: currentUser?.name,
			email: currentUser?.email,
			user_type: currentUser?.type,
		});
		// eslint-disable-next-line
	}, [currentUser]);

	const onSubmit = () => {};

	return (
		<>
			<div className="bg-gray-50 min-h-screen">
				<div className="container mx-auto max-w-3xl mt-8">
					<h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">
						Your account profile
					</h1>
					<ul className="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
						<li className="mr-8 text-gray-900 border-b-2 border-gray-800">
							<a href="#_" className="py-4 inline-block">
								Profile Info
							</a>
						</li>
					</ul>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
							<div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
								<h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">
									Profile Info
								</h2>
								<p className="text-xs text-gray-500">
									Your basic profile information such as Email Address, Name,
									and Phone.
								</p>
							</div>
							<div className="md:w-2/3 w-full">
								<div className="py-8 px-16">
									<label htmlFor="name" className="text-sm text-gray-600">
										Name
									</label>
									<input
										{...register('name', {
											required: 'Name is required!',
										})}
										className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
										type="text"
										name="name"
									/>
									<span className="text-red-600">{errors?.name?.message}</span>
								</div>
								<hr className="border-gray-200" />
								<div className="py-8 px-16">
									<label htmlFor="email" className="text-sm text-gray-600">
										Email Address
									</label>
									<input
										{...register('email', {
											required: 'Email address is required!',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: 'Invalid email address',
											},
											shouldFocus: true,
										})}
										className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
										type="email"
										name="email"
									/>
									<span className="text-red-600">{errors?.email?.message}</span>
								</div>
								<hr className="border-gray-200" />
								<div className="py-8 px-16">
									<label htmlFor="user_type" className="text-sm text-gray-600">
										User type
									</label>
									<input
										{...register('user_type', {
											required: 'User type is required!',
										})}
										className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
										type="text"
										name="user_type"
									/>
									<span className="text-red-600">
										{errors?.user_type?.message}
									</span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Profile;
