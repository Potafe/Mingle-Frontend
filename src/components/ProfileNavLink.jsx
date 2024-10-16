/* eslint-disable react/prop-types */
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

export default function ProfileNavLink({
	linkTo,
	profileURL,
	firstname,
	lastname,
	username,
}) {

    const navlinkClassCallback = ({ isActive, isPending }) => {
		const baseClass =
			'transition flex justify-start items-center gap-2 p-2 rounded-md hover:bg-dark-200';
		const navlinkClass = isPending
			? 'text-gray-500'
			: isActive
			? 'bg-dark-200'
			: '';
		return `${navlinkClass} ${baseClass}`;
	};
    
	return (
		<NavLink to={linkTo} className={navlinkClassCallback}>		
		<img className='size-10 rounded-full' src={profileURL} alt='profile' />
			<div className='flex flex-col'>
				<p>{_.startCase(`${firstname} ${lastname}`)}</p>
				{username && <p className='text-xs text-dark-500'>@{username}</p>}
			</div>
		</NavLink>
	);
}
