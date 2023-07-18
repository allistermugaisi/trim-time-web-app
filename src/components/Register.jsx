import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
	const navigate = useNavigate();

	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	let imageUrls = [
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234045/trim-time/short-hairstyles-for-women-over-50_r566fd.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234044/trim-time/short-hair-styles-GettyImages-165550551-162f84799256479187e0ce10dc9e8369_x618xk.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234044/trim-time/2-feminine-blonde-short-haircut-with-skin-fade_m2ebp4.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234044/trim-time/hottest-short-haircuts-women-spiked-pixie-undercut_x8b5lp.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234043/trim-time/modern-hairstyles-1x1-1_csrdvn.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234043/trim-time/woman-with-short-haircut-and-shaved-side_f0yssz.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233942/trim-time/Low-fade-haircut-with-full-beard-gray-abbas_ahmadifard_yth3fp.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233940/trim-time/full-beard-and-undercut-fade_c2e1ed.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233939/trim-time/942fce04452fec868a5573f1488852b0_f7ujm0.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233938/trim-time/Short-haircut-with-beard-fade-crop-abbas_ahmadifard_yhewtx.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233938/trim-time/Casual-Brushed-Up-Top_bvnyn0.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233938/trim-time/beard-with-mid-fade_tfi0cq.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233938/trim-time/12_Curly_Fade_Haircut_with_Facial_Hair.width-800_lhohhu.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/faded-beard-with-a-messy-top-and-mid-fade_d03usf.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/6._Buzz_cut_and_matching_beard_length_.width-800_wdjzng.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/long-messy-top-with-a-faded-beard-for-men_zijrhs.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/beard-fade_qjwxf1.jpg',
		'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/7374005ebb2fb14f77171024529dc17e_xm6xht.jpg',
	];

	let type_of_service = [
		'Hair + beard haircut',
		"Men's haircut",
		'Hairstyling',
		'Razor shave',
		'Head camo',
		'Haircut machine',
		'Beard haircut',
		'Beard / Head camo',
	];

	let location = [
		'Kiambu, Kenya',
		'Kisumu, Kenya',
		'Machakos, Kenya',
		'Mombasa, Kenya',
		'Nairobi, Kenya',
		'Kericho, Kenya',
		'Nyali, Kenya',
		'Ngong, Kenya',
		'Eldoret, Kenya',
		'Nyandarua, Kenya',
	];

	const onSubmit = async (data, e) => {
		e.preventDefault();

		setButtonLoading(true);
		const { user_type, name, email, password, accept_terms } = data;

		if (user_type === 'barber') {
			let imageUrl = getRandomString(imageUrls);

			const payload = JSON.stringify({
				id: Math.floor(Math.random() * 10000),
				type: user_type,
				name,
				email,
				imageUrl: imageUrl,
				price: Math.floor(Math.random() * 20000),
				location: getRandomString(location),
				experience: Math.floor(Math.random() * 8),
				rating: Math.floor(Math.random() * 5),
				clients: Math.floor(Math.random() * 500),
				services: getRandomString(type_of_service).toArray(),
				password,
				confirm_password: password,
				accept_terms,
			});

			fetch('https://trim-time-api.onrender.com/barbers', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: payload,
			})
				.then((res) => {
					toast.success('You have been registered successfully.');
					setButtonLoading(false);
					navigate('/auth/login');
				})
				.catch((error) => {
					toast.error('Failed :' + error.response.message);
					setButtonLoading(false);
				});
		} else {
			let imageUrl = getRandomString(imageUrls);

			const payload = JSON.stringify({
				id: Math.floor(Math.random() * 10000),
				type: user_type,
				profile: imageUrl,
				name,
				email,
				password,
				confirm_password: password,
				accept_terms,
			});

			fetch('https://trim-time-api.onrender.com/users', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: payload,
			})
				.then((res) => {
					toast.success('You have been registered successfully.');
					setButtonLoading(false);
					navigate('/auth/login');
				})
				.catch((error) => {
					toast.error('Failed :' + error.response.message);
					setButtonLoading(false);
				});
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					to="/"
					reloadDocument
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Trim-Time
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create an account
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<div>
								<label
									htmlFor="user_type"
									className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									User type
								</label>
								<select
									{...register('user_type', {
										required: {
											value: true,
											message: 'User type is required',
										},
									})}
									id="user_type"
									name="user_type"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									<option>Choose your user type</option>
									<option defaultValue="client">client</option>
									<option defaultValue="owner">owner</option>
									<option defaultValue="barber">barber</option>
								</select>
								{errors?.user_type && (
									<span className="text-red-500 text-xs">
										{errors?.user_type?.message}
									</span>
								)}
							</div>

							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your name
								</label>
								<input
									{...register('name', {
										required: 'Your name is required!',
										shouldFocus: true,
									})}
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="John Doe"
									required=""
								/>
								{errors?.name && (
									<span className="text-red-500 text-xs">
										{errors?.name?.message}
									</span>
								)}
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
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
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@example.com"
									required=""
								/>
								{errors?.email && (
									<span className="text-red-500 text-xs">
										{errors?.email?.message}
									</span>
								)}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									{...register('password', {
										required: 'Password is required!',
										minLength: {
											value: 8,
											message: 'Password should be atleast 8 characters',
										},
									})}
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
								/>
								{errors?.password && (
									<span className="text-red-500 text-xs">
										{errors?.password?.message}
									</span>
								)}
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										{...register('accept_terms', {
											required: 'Terms of service is required!',
											shouldFocus: true,
										})}
										id="accept_terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required=""
									/>
									{errors?.accept_terms && (
										<span className="text-red-500 text-xs">
											{errors?.accept_terms?.message}
										</span>
									)}
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="accept_terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the{' '}
										<a
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											href="#"
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<button
								disabled={buttonLoading ? true : false}
								type="submit"
								className={
									buttonLoading
										? 'w-full text-white bg-gray-500 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
										: 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
								}
							>
								{buttonLoading ? 'Loading' : 'Create an account'}
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{' '}
								<Link
									to="/auth/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
			<Toaster position="top-center" />
		</section>
	);
};

export default Register;

function getRandomString(arrayList) {
	if (arrayList.length === 0) {
		return null;
	}
	let randomIndex = Math.floor(Math.random() * arrayList.length);
	return arrayList[randomIndex];
}
