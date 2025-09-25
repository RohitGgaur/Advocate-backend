import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.jpg'

function AdminSidebar({ isOpen, onClose }) {
	const location = useLocation()

	const menuItems = [
		{ name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
		{ name: 'Blog Management', path: '/admin/dashboard/blogs', icon: '📝' },
		{ name: 'Admin Management', path: '/admin/dashboard/admins', icon: '👥' },
		{ name: 'Profile', path: '/admin/dashboard/profile', icon: '👤' },
		{ name: 'Settings', path: '/admin/dashboard/settings', icon: '⚙️' },
	]

	return (
		<>
			{/* Mobile Overlay */}
			{isOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<div className={`
				fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out h-full
				${isOpen ? 'translate-x-0' : '-translate-x-full'}
				lg:translate-x-0 lg:static lg:inset-0 lg:h-full
			`}>
				{/* Logo */}
				<div className="flex items-center justify-center h-16 px-4 bg-brand">
					<img src={logo} alt="Judicioworks" className="h-10 w-auto" />
				</div>

				{/* Navigation */}
				<nav className="flex-1 mt-8">
					<ul className="space-y-2 px-4">
						{menuItems.map((item) => (
							<li key={item.name}>
								<Link
									to={item.path}
									className={`
										flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
										${location.pathname === item.path
											? 'bg-brand text-white'
											: 'text-gray-700 hover:bg-gray-100'
										}
									`}
									onClick={onClose}
								>
									<span className="text-lg mr-3">{item.icon}</span>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Logout Button */}
				<div className="p-4">
					<button
						onClick={() => {
							localStorage.removeItem('adminData')
							window.location.href = '/admin/login'
						}}
						className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
					>
						<span className="text-lg mr-3">🚪</span>
						Logout
					</button>
				</div>
			</div>
		</>
	)
}

export default AdminSidebar
