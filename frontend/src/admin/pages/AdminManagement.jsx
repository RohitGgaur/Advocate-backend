import { useState, useEffect } from 'react'
import apiService from '../../services/api'

function AdminManagement() {
	const [admins, setAdmins] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		loadAdmins()
	}, [])

	const loadAdmins = async () => {
		try {
			setLoading(true)
			console.log('🔄 AdminManagement: Loading admins from backend...')
			console.log('🔄 AdminManagement: Search term:', searchTerm)
			
			// Call API directly without search term for now
			const response = await apiService.getAdmins()
			console.log('📊 AdminManagement: Admins response:', response)
			
			if (response.success && response.admins) {
				console.log('✅ AdminManagement: Admins loaded:', response.admins)
				console.log('📊 AdminManagement: Number of admins:', response.admins.length)
				setAdmins(response.admins)
			} else {
				console.error('❌ AdminManagement: Invalid response:', response)
				throw new Error('Invalid response from backend')
			}
		} catch (error) {
			console.error('❌ AdminManagement: Error loading admins:', error)
			console.error('❌ AdminManagement: Error details:', error.message)
			alert(`Failed to load admins: ${error.message}`)
			setAdmins([])
		} finally {
			setLoading(false)
		}
	}

	const handleSearch = (e) => {
		setSearchTerm(e.target.value)
		// Debounce search
		setTimeout(() => {
			loadAdmins()
		}, 500)
	}

	const handleStatusChange = async (adminId, currentStatus) => {
		try {
			await apiService.updateAdminStatus(adminId, !currentStatus)
			await loadAdmins()
			alert(`Admin ${!currentStatus ? 'activated' : 'deactivated'} successfully`)
		} catch (error) {
			console.error('Error updating admin status:', error)
			alert(error.message || 'Failed to update admin status')
		}
	}

	const handleRoleChange = async (adminId, newRole) => {
		try {
			await apiService.updateAdminRole(adminId, newRole)
			await loadAdmins()
			alert('Admin role updated successfully')
		} catch (error) {
			console.error('Error updating admin role:', error)
			alert(error.message || 'Failed to update admin role')
		}
	}

	const handleDeleteAdmin = async (adminId, adminName) => {
		if (window.confirm(`Are you sure you want to delete ${adminName}? This action cannot be undone.`)) {
			try {
				await apiService.deleteAdmin(adminId)
				await loadAdmins()
				alert('Admin deleted successfully')
			} catch (error) {
				console.error('Error deleting admin:', error)
				alert(error.message || 'Failed to delete admin')
			}
		}
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<div>
					<h1 className="text-xl sm:text-3xl font-bold text-gray-900">Admin Management</h1>
					<p className="text-sm sm:text-base text-gray-600 mt-1">Manage admin accounts and permissions</p>
				</div>
			</div>

			{/* Test Content */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Admin Management Page</h2>
				<p className="text-sm sm:text-base text-gray-600">This is the admin management page. If you can see this, the routing is working!</p>
			</div>

			{/* Search Bar */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:space-x-4">
					<div className="flex-1">
						<input
							type="text"
							placeholder="Search admins by name or email..."
							value={searchTerm}
							onChange={handleSearch}
							className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-sm sm:text-base"
						/>
					</div>
					<button
						onClick={loadAdmins}
						className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm sm:text-base"
					>
						Search
					</button>
				</div>
			</div>

			{/* Admins List */}
			<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
				{/* Desktop Table View */}
				<div className="hidden md:block overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Admin
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Join Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Last Login
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{loading ? (
								<tr>
									<td colSpan="6" className="px-6 py-8 text-center text-gray-500">
										Loading admins...
									</td>
								</tr>
							) : admins.length === 0 ? (
								<tr>
									<td colSpan="6" className="px-6 py-8 text-center text-gray-500">
										No admins found.
									</td>
								</tr>
							) : (
								admins.map((admin) => (
									<tr key={admin._id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
													<span className="text-white font-bold">
														{(admin.username || admin.name || 'A').charAt(0).toUpperCase()}
													</span>
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{admin.username || admin.name || 'Unknown'}
													</div>
													<div className="text-sm text-gray-500">
														{admin.email}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<select
												value={admin.role}
												onChange={(e) => handleRoleChange(admin._id, e.target.value)}
												className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand"
											>
												<option value="Administrator">Administrator</option>
												<option value="Editor">Editor</option>
												<option value="Viewer">Viewer</option>
											</select>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<button
												onClick={() => handleStatusChange(admin._id, admin.is_active)}
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													admin.is_active
														? 'bg-green-100 text-green-800 hover:bg-green-200'
														: 'bg-red-100 text-red-800 hover:bg-red-200'
												}`}
											>
												{admin.is_active ? 'Active' : 'Inactive'}
											</button>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'Unknown'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button
												onClick={() => handleDeleteAdmin(admin._id, admin.username || admin.name)}
												className="text-red-600 hover:text-red-800"
											>
												Delete
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Mobile Card View */}
				<div className="md:hidden">
					{loading ? (
						<div className="p-6 text-center text-gray-500">
							Loading admins...
						</div>
					) : admins.length === 0 ? (
						<div className="p-6 text-center text-gray-500">
							No admins found.
						</div>
					) : (
						<div className="space-y-4">
							{admins.map((admin) => (
								<div key={admin._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
									<div className="flex items-center space-x-3 mb-3">
										<div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
											<span className="text-white font-bold text-sm">
												{(admin.username || admin.name || 'A').charAt(0).toUpperCase()}
											</span>
										</div>
										<div className="flex-1 min-w-0">
											<div className="text-sm font-medium text-gray-900 truncate">
												{admin.username || admin.name || 'Unknown'}
											</div>
											<div className="text-xs text-gray-500 truncate">
												{admin.email}
											</div>
										</div>
									</div>
									
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-xs text-gray-500">Role:</span>
											<select
												value={admin.role}
												onChange={(e) => handleRoleChange(admin._id, e.target.value)}
												className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand"
											>
												<option value="Administrator">Administrator</option>
												<option value="Editor">Editor</option>
												<option value="Viewer">Viewer</option>
											</select>
										</div>
										
										<div className="flex items-center justify-between">
											<span className="text-xs text-gray-500">Status:</span>
											<button
												onClick={() => handleStatusChange(admin._id, admin.is_active)}
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													admin.is_active
														? 'bg-green-100 text-green-800 hover:bg-green-200'
														: 'bg-red-100 text-red-800 hover:bg-red-200'
												}`}
											>
												{admin.is_active ? 'Active' : 'Inactive'}
											</button>
										</div>
										
										<div className="flex items-center justify-between">
											<span className="text-xs text-gray-500">Join Date:</span>
											<span className="text-xs text-gray-900">
												{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'Unknown'}
											</span>
										</div>
										
										<div className="flex items-center justify-between">
											<span className="text-xs text-gray-500">Last Login:</span>
											<span className="text-xs text-gray-500">
												{admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}
											</span>
										</div>
										
										<div className="flex justify-end pt-2">
											<button
												onClick={() => handleDeleteAdmin(admin._id, admin.username || admin.name)}
												className="text-xs text-red-600 hover:text-red-800 font-medium"
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default AdminManagement
