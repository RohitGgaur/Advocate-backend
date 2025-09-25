import { useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'

function AdminLayout({ children, currentAdmin, onLogout }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="h-screen bg-gray-100 flex">
			{/* Sidebar */}
			<AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} currentAdmin={currentAdmin} />
			
			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdminHeader onMenuClick={() => setSidebarOpen(true)} currentAdmin={currentAdmin} onLogout={onLogout} />
				
				{/* Page Content */}
				<main className="flex-1 overflow-y-auto p-6">
					{children}
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
