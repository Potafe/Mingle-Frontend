import { UserCardLoading } from './LoadingScreens';
import ProfileNavLink from './ProfileNavLink';

export default function UserFeed({ users, isLoading, error, type = 'chats' }) {
	return (
		<div className='flex flex-col gap-1 overflow-auto'>
			{isLoading && <UserCardLoading />}
			{error && <p className='text-destructive'>Failed to load users</p>}
			{users && users.length === 0 && (
				<p className='text-sm italic text-dark-500'>
					{`You currently have no ${type === 'chats' ? 'friends' : 'groups'}`}
				</p>
			)}
			{users &&
				users.length > 0 &&
				users.map((user) => (
					<ProfileNavLink
						key={user._id}
						linkTo={`/${type}/${user._id}`}
						profileURL={user.profile.url}
						firstname={user.firstname || user.name}
						lastname={user.lastname || ''}
						username={user.username || null}
					/>
				))}
		</div>
	);
}