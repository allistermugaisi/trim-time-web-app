import React from 'react';

const Filters = () => {
	return (
		<>
			<aside
				className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-300 dark:border-gray-700"
				aria-label="Sidenav"
				id="drawer-navigation"
			>
				<div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-300">
					<ul className="space-y-2">
						<li>
							<button
								type="button"
								className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
								aria-controls="dropdown-pages"
								data-collapse-toggle="dropdown-pages"
							>
								<span className="flex-1 ml-3 font-bold text-left whitespace-nowrap">
									Type of service
								</span>
								<svg
									aria-hidden="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
							<ul id="dropdown-pages" className="hidden py-2 space-y-2">
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Hair + Beard Haircut
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Beard / Head Camo
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Haircut machine
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>

								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Beard haircut
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Men's haircut
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Razor shave
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Hairstyling
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
								<li>
									<div className="flex items-center justify-between mb-4 mx-4">
										<label
											htmlFor="default-checkbox"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Stacking
										</label>
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
};

export default Filters;
