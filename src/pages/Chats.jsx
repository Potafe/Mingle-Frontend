import { fetchUserByID } from '@/api/users';
import SearchUsersFeed from '@/components/SearchUserFeed';
import {
	SecondarySidebarAside,
	SecondarySidebarAsideHeader,
	SecondarySidebarAsideHeaderText,
	SecondarySidebarContainer,
} from '@/components/Sidebar';
import UsersFeed from '@/components/UserFeed';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/useToast';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Chats() {
	const navigate = useNavigate();
	const [addMode, setAddMode] = useState(false);

	const { toast } = useToast();
	const userID = localStorage.getItem('UserID');

	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Network error',
				description: 'Failed to load chats',
			});

			
			if (
				error.response.data === 'Unauthorized' &&
				localStorage.getItem('Token')
			) {
				toast({
					variant: 'destructive',
					title: 'Expired Token Detected',
					description: 'Login again to get new token',
					action: (
						<ToastAction onClick={() => navigate('/logout')} altText='Logout'>
							Logout
						</ToastAction>
					),
				});
			}
		}
	}, [error, toast, navigate]);

	return (
		<SecondarySidebarContainer>
			<SecondarySidebarAside>
				<SecondarySidebarAsideHeader>
					<SecondarySidebarAsideHeaderText>
						{addMode ? 'Users' : 'Chats'}
					</SecondarySidebarAsideHeaderText>
					<button
						onClick={() => setAddMode(!addMode)}
						className='transition hover:bg-dark-300 rounded-full p-1'
					>
						<img
							className={`transition size-8 ${addMode ? 'rotate-45' : ''}`}
							src={'/plus.svg'}
						/>
					</button>
				</SecondarySidebarAsideHeader>
				{addMode ? (
					<SearchUsersFeed />
				) : (
					<UsersFeed
						users={userData?.friends}
						isLoading={isLoading}
						error={error}
					/>
				)}
			</SecondarySidebarAside>
			<Outlet />
		</SecondarySidebarContainer>
	);
}