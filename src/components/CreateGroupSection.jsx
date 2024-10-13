import { fetchUserByID } from '@/api/users';
import { MainContentContainer } from './MainContent';
import CreateGroupForm from './forms/CreateGroupForm';
import { useQuery } from '@tanstack/react-query';
import LandingPage from '@/pages/LandingPage';

export default function CreateGroupSection() {
	const userID = localStorage.getItem('UserID');
	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});
	if (isLoading) {
		return <LandingPage title='Loading...' />;
	}
	if (error) {
		return <LandingPage title='Error fetching user' />;
	}
	return (
		<MainContentContainer>
			<section className='p-3'>
				<div className='p-3 border-b border-dark-400'>
					<h1 className='text-2xl font-semibold'>Create Group</h1>
				</div>
				<CreateGroupForm userData={userData} />
			</section>
		</MainContentContainer>
	);
}