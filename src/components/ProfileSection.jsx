import { Link, useParams } from 'react-router-dom';
import { MainContentContainer } from './MainContent';
import { useQuery } from '@tanstack/react-query';
import { fetchUserByID } from '@/api/users';
import _ from 'lodash';
import { Button } from './ui/button';
import CoverPhoto from './CoverPhoto';
import LandingPage from '@/pages/LandingPage';


export default function ProfileSection() {
	const { userID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	// Fetch user data
	const {
		data: userData,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	// Handle loading state
	if (isLoading) {
		return <LandingPage title='Loading...' />;
	}

	if (error) {
		return <LandingPage title='Error fetching user' />;
	}

	// Ensure userData, userData.cover, and userData.profile are defined
	const coverUrl = userData?.cover?.url ? userData.cover.url : '/cover.svg';
	const profileUrl = userData?.profile?.url ? userData.profile.url : '/profile.svg'; // fallback to default profile picture if undefined

	return (
		<MainContentContainer>
			{/* USER COVER AND PROFILE AREA */}
			<div className='relative p-3'>
				{/* Cover photo */}
				<CoverPhoto
					refetch={refetch}
					userID={userData?._id}
					imageURL={coverUrl}
				/>
				{/* Empty space below cover photo */}
				<div className='h-16'></div>
				{/* Profile photo */}
				<div className='absolute bottom-3 left-6 size-[10rem]'>
					<img
						className='rounded-full'
						src={profileUrl}
						alt='Profile'
					/>
				</div>
			</div>
			{/* USER FULLNAME AND USERNAME AREA */}
			<div className='px-6 flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-semibold'>
						{_.startCase(`${userData?.firstname || ''} ${userData?.lastname || ''}`)}
					</h2>
					<p className='text-dark-500'>@{userData?.username || 'username'}</p>
					<p className='pt-5 text-dark-500'>{userData?.bio || 'No bio available'}</p>
				</div>
				{userData?._id === currentUserID ? (
					<Button variant='secondary'>
						<Link to={`/profile/edit/${currentUserID}`}>Edit Profile</Link>
					</Button>
				) : (
					<Button variant='secondary'>
						<Link to={`/chats/${userID}`}>Send Message</Link>
					</Button>
				)}
			</div>
			{/* User Friends */}
			<div></div>
		</MainContentContainer>
	);
}
