import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import BlogManagement from './pages/BlogManagement'
import AdminProfile from './pages/AdminProfile'
import AdminManagement from './pages/AdminManagement'
import Settings from './pages/Settings'
import { Routes, Route, Navigate } from 'react-router-dom'

function AdminDashboardPage() {
	const [currentAdmin, setCurrentAdmin] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		console.log('AdminDashboardPage: Checking authentication...')
		// Check if admin is logged in
		const adminData = localStorage.getItem('adminData')
		console.log('AdminDashboardPage: adminData from localStorage:', adminData)
		
		if (adminData) {
			try {
				const admin = JSON.parse(adminData)
				console.log('AdminDashboardPage: Parsed admin data:', admin)
				setCurrentAdmin(admin)
				setLoading(false)
			} catch (error) {
				console.error('AdminDashboardPage: Error parsing admin data:', error)
				// Invalid data, remove it
				localStorage.removeItem('adminData')
				setLoading(false)
				navigate('/admin/login')
			}
		} else {
			console.log('AdminDashboardPage: No admin data found, redirecting to login')
			setLoading(false)
			navigate('/admin/login')
		}
	}, [navigate])


	const handleLogout = () => {
		localStorage.removeItem('adminData')
		setCurrentAdmin(null)
		navigate('/admin/login')
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		)
	}

	if (!currentAdmin) {
		return null // Will redirect to login
	}

	console.log('AdminDashboardPage: Rendering with currentAdmin:', currentAdmin)
	
	console.log('AdminDashboardPage rendering with currentAdmin:', currentAdmin)
	console.log('Loading state:', loading)
	
	if (loading) {
		return (
			<div className="h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading admin dashboard...</p>
				</div>
			</div>
		)
	}

	return (
		<AdminLayout currentAdmin={currentAdmin} onLogout={handleLogout}>
			<Routes>
				<Route path="/" element={<AdminDashboard currentAdmin={currentAdmin} />} />
				<Route path="/blogs" element={<BlogManagement />} />
				<Route path="/profile" element={<AdminProfile currentAdmin={currentAdmin} />} />
				<Route path="/admins" element={<AdminManagement />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
			</Routes>
		</AdminLayout>
	)
}

export default AdminDashboardPage
