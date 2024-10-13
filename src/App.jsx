import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
	return (
		<main className='bg-dark flex min-h-screen w-full text-white p-3 gap-3'>
			<Sidebar />
			<Outlet />
		</main>
	);
}

export default App;