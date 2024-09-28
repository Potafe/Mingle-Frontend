import { fetchUserByID } from '@/api/users';
import SearchUsersFeed from '@/components/SearchUserFeed';
import UsersFeed from '@/components/UserFeed';
import { useToast } from '@/components/ui/useToast';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Chats() {
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
		}
	}, [error, toast]);

	return (
		<section className='min-h-max w-full flex gap-3'>
			<aside className='h-[96.5vh] w-[30rem] bg-dark-100 p-3 rounded-md flex flex-col shadow-2xl'>
				<div className='flex justify-between mb-3'>
					<h1 className='text-2xl font-semibold flex items-center'>
						{addMode ? 'Users' : 'Chats'}
					</h1>
					<button
						onClick={() => setAddMode(!addMode)}
						className='transition hover:bg-dark-300 rounded-full p-1'
					>
						<img
							className='size-8'
							src={`${addMode ? '/cross.svg' : '/plus.svg'}`}
							alt=''
						/>
					</button>
				</div>
				{addMode ? (
					<SearchUsersFeed />
				) : (
					<UsersFeed
						users={userData?.friends}
						isLoading={isLoading}
						error={error}
					/>
				)}
			</aside>

			<Outlet />
		</section>
	);
}