import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarContainer,
} from '@/components/Sidebar';

import { NavLink, Outlet, useParams } from 'react-router-dom';

export default function Profile() {
	const { userID } = useParams();
	const currentUserID = localStorage.getItem('UserID');
	return (
		<SecondarySidebarContainer>
			<SecondarySidebarAside>
				<SecondarySidebarAsideHeader>
					<SecondarySidebarAsideHeaderText>
						{userID === currentUserID ? 'Manage' : 'User'} Profile
					</SecondarySidebarAsideHeaderText>
				</SecondarySidebarAsideHeader>
				{/* sidebar content */}
				{userID === currentUserID && (
					<div className='flex flex-col gap-1'>
						<NavLink
							to={`/profile/${currentUserID}`}
							className={navlinkClassCallback}
						>
							Profile
						</NavLink>
						<NavLink
							to={`/profile/edit/${currentUserID}`}
							className={navlinkClassCallback}
						>
							Edit Profile
						</NavLink>
						<NavLink
							to={`/profile/change/password/${currentUserID}`}
							className={navlinkClassCallback}
						>
							Change Password
						</NavLink>
					</div>
				)}
			</SecondarySidebarAside>
			{/* MAIN CONTENT */}
			<Outlet />
		</SecondarySidebarContainer>
	);
}
const navlinkClassCallback = ({ isActive, isPending }) => {
	const baseClass =
		'transition text-dark-500 flex justify-start items-center gap-2 p-2 rounded-md hover:bg-dark-200';
	const navlinkClass = isPending
		? 'text-gray-500'
		: isActive
		? 'bg-dark-200'
		: '';
	return `${navlinkClass} ${baseClass}`;
};