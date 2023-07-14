import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
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

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	const onSubmit = async (data, e) => {
		setButtonLoading(true);
		e.preventDefault();
		const { email, password } = data;

		fetch(`https://trim-time-api.onrender.com/users?email=${email}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (Object.keys(res).length === 0) {
					toast.error('Please Enter valid username');
					setButtonLoading(false);
				} else {
					if (res[0].password === password) {
						sessionStorage.setItem('email', email);
						sessionStorage.setItem('userId', res[0].id);
						sessionStorage.setItem('user_type', res[0].type);
						navigate('/');
						navigate(0);
						setButtonLoading(false);
						toast.success(`Success! User logged in successfully.`);
					} else {
						toast.error('Please enter valid credentials');
						setButtonLoading(false);
					}
				}
			})
			.catch((error) => {
				toast.error('Login Failed due to :' + error.response.message);
				setButtonLoading(false);
			});
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
							Login to your account
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
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
									placeholder="johndoe@example.com"
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
							<button
								disabled={buttonLoading ? true : false}
								type="submit"
								className={
									buttonLoading
										? 'w-full text-white bg-gray-500 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
										: 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
								}
							>
								{buttonLoading ? 'Loading' : 'Login'}
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don't have an account?{' '}
								<Link
									to="/auth/register"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Create an account
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

export default Login;
