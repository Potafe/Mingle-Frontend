import { useQuery } from '@tanstack/react-query';
import { MainContentContainer } from './MainContent';
import { fetchUserByID } from '@/api/users';
import ProfileEditForm from './forms/ProfileEditForm';
import LandingPage from '@/pages/LandingPage';

export default function ProfileEditSection() {
	const currentUserID = localStorage.getItem('UserID');
	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
	});
	if (isLoading) {
		return <LandingPage title='Loading...' />;
	}

	if (error) {
		return <LandingPage title='Error fetching user' />;
	}
	return (
		<MainContentContainer>
			<ProfileEditForm userData={userData} />
		</MainContentContainer>
	);
}