import { PrimarySidebarContainer, PrimarySidebarNav } from './PrimSidebar';

export default function PrimarySidebar() {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<PrimarySidebarContainer>
			<div>
				<PrimarySidebarNav
					linkTo='/global'
					icon='/global.svg'
					title='Global'
				/>
				<PrimarySidebarNav
					linkTo='/chats'
					icon='/chat.svg'
					title='Chats'
				/>
				<PrimarySidebarNav
					linkTo='/groups'
					icon='/groups.svg'
					title='Groups'
				/>
			</div>
			<div>
				<PrimarySidebarNav
					linkTo={`/profile/${currentUserID}`}
					icon='/profile.svg'
					title='Profile'
				/>
				<PrimarySidebarNav
					linkTo='/logout'
					icon='/logout.svg'
					title='Logout'
				/>
			</div>
		</PrimarySidebarContainer>
	);
}

export function SecondarySidebarContainer({ children }) {
	return <section className='min-h-max w-full flex gap-3'>{children}</section>;
}

export function SecondarySidebarAside({ children }) {
	return (
		<aside className='h-[96.5vh] w-[30rem] bg-dark-100 p-3 rounded-md flex flex-col shadow-2xl'>
			{children}
		</aside>
	);
}

export function SecondarySidebarAsideHeader({ children }) {
	return <div className='flex justify-between mb-3'>{children}</div>;
}

export function SecondarySidebarAsideHeaderText({ children }) {
	return (
		<h1 className='text-2xl font-semibold flex items-center'>{children}</h1>
	);
}