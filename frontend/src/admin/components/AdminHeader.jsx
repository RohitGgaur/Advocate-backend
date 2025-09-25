import logo from '../../assets/logo.jpg'

function AdminHeader({ onMenuClick, currentAdmin, onLogout }) {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200">
			<div className="flex items-center justify-between px-6 py-4">
				{/* Mobile Menu Button */}
				<button
					onClick={onMenuClick}
					className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>

				{/* Logo for mobile */}
				<div className="lg:hidden flex items-center">
					<img src={logo} alt="Judicioworks" className="h-8 w-auto" />
				</div>

				{/* Page Title */}
				<div className="hidden lg:block">
					<h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
				</div>

				{/* User Info */}
				<div className="flex items-center space-x-4">
					<div className="text-right">
						<p className="text-sm font-medium text-gray-900">
							{currentAdmin?.username || 'Admin User'}
						</p>
						<p className="text-xs text-gray-500">
							{currentAdmin?.role || 'Administrator'}
						</p>
					</div>
					<div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
						<span className="text-white text-sm font-medium">
							{currentAdmin?.username?.charAt(0).toUpperCase() || 'A'}
						</span>
					</div>
					<button
						onClick={onLogout}
						className="text-gray-500 hover:text-gray-700 text-sm"
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	)
}

export default AdminHeader
