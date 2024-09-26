import SidebarNav from './SidebarNav';

export default function PrimarySidebar() {
	return (
		<aside className='h-[96.5vh] bg-dark rounded-md flex flex-col justify-between'>
			<div>
				<SidebarNav linkTo='/global' icon='/global.svg' title='Global' />
				<SidebarNav linkTo='/chats' icon='/chat.svg' title='Chats' />
				<SidebarNav linkTo='/groups' icon='/groups.svg' title='Groups' />
			</div>
			<div>
				<SidebarNav
					linkTo='/profile'
					icon='/profile.svg'
					title='Profile'
				/>
				<SidebarNav linkTo='/logout' icon='/logout.svg' title='Logout' />
			</div>
		</aside>
	);
}