import React from 'react';
import logo from '../images/trace-with-us-logo.png';

const Navbar = () => {
	return (
		<>
			<div className='bg-white border w-full'>
				<div className='max-w-7xl px-2 sm:px-6 lg:px-8'>
					<div className='relative flex items-center justify-between h-16'>
						<div className='flex-1 flex items-center justify-center lg:justify-start'>
							<div className='flex-shrink-0 flex items-center'>
								<img src={logo} alt='logo' width={200} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
