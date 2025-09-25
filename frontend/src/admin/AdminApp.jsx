import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import BlogManagement from './pages/BlogManagement'
import AdminBlogDetail from './pages/AdminBlogDetail'
import AdminProfile from './pages/AdminProfile'
import AdminManagement from './pages/AdminManagement'
import Settings from './pages/Settings'
import AuthModal from './components/AuthModal'
import apiService from '../services/api'

function AdminApp() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [showAuthModal, setShowAuthModal] = useState(false)
	const [authMode, setAuthMode] = useState('login')
	const [loading, setLoading] = useState(true)
	const [currentAdmin, setCurrentAdmin] = useState(null)

	useEffect(() => {
		// Always fetch fresh data from backend on app start
		const checkAuthStatus = async () => {
			try {
				console.log('🔄 AdminApp: Fetching fresh admin data from backend...')
				const response = await apiService.getProfile()
				console.log('📊 AdminApp: Backend response:', response)
				
				if (response.success && response.admin) {
					console.log('✅ AdminApp: Fresh admin data received:', response.admin)
					console.log('🆔 AdminApp: Admin ID:', response.admin._id)
					console.log('👤 AdminApp: Username:', response.admin.username)
					
					setCurrentAdmin(response.admin)
					setIsAuthenticated(true)
					
					console.log('💾 AdminApp: State updated with fresh data')
				} else {
					console.error('❌ AdminApp: Invalid response from backend:', response)
					throw new Error('Invalid response from backend')
				}
			} catch (error) {
				console.error('❌ AdminApp: Error fetching admin data:', error)
				setCurrentAdmin(null)
				setIsAuthenticated(false)
			} finally {
				setLoading(false)
			}
		}

		checkAuthStatus()
	}, [])

	// Listen for admin data updates
	useEffect(() => {
		const handleAdminDataUpdate = (event) => {
			console.log('Admin data updated:', event.detail)
			if (event.detail?.updatedAdmin) {
				setCurrentAdmin(event.detail.updatedAdmin)
			}
		}

		window.addEventListener('adminDataUpdated', handleAdminDataUpdate)
		
		return () => {
			window.removeEventListener('adminDataUpdated', handleAdminDataUpdate)
		}
	}, [])

	const handleLogin = async (formData) => {
		try {
			console.log('Attempting login with:', formData.email)
			const response = await apiService.login({
				email: formData.email,
				password: formData.password
			})
			
			console.log('Login response:', response)
			
			// Store admin data in localStorage instead of token
			localStorage.setItem('adminData', JSON.stringify(response.admin))
			setCurrentAdmin(response.admin)
			setIsAuthenticated(true)
			setShowAuthModal(false)
			
			console.log('Login successful, admin data stored')
		} catch (error) {
			console.error('Login error:', error)
			alert(error.message || 'Login failed')
		}
	}

	const handleSignup = async (formData) => {
		try {
			if (formData.password !== formData.confirmPassword) {
				alert('Passwords do not match')
				return
			}

			console.log('Attempting signup with:', formData.email)
			const response = await apiService.register({
				username: formData.username,
				email: formData.email,
				password: formData.password,
				role: 'admin'
			})
			
			console.log('Signup response:', response)
			
			// Store admin data in localStorage instead of token
			localStorage.setItem('adminData', JSON.stringify(response.admin))
			setCurrentAdmin(response.admin)
			setIsAuthenticated(true)
			setShowAuthModal(false)
			
			console.log('Signup successful, admin data stored')
		} catch (error) {
			console.error('Signup error:', error)
			alert(error.message || 'Registration failed')
		}
	}

	const switchAuthMode = () => {
		setAuthMode(authMode === 'login' ? 'signup' : 'login')
	}

	const handleLogout = () => {
		localStorage.removeItem('adminData')
		setCurrentAdmin(null)
		setIsAuthenticated(false)
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

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
					<p className="text-gray-600 mb-6">Please log in to access the admin panel</p>
					<button
						onClick={() => setShowAuthModal(true)}
						className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand/90 transition-colors"
					>
						Login to Admin Panel
					</button>
				</div>

				<AuthModal
					isOpen={showAuthModal}
					onClose={() => setShowAuthModal(false)}
					mode={authMode}
					onSwitchMode={switchAuthMode}
					onLogin={handleLogin}
					onSignup={handleSignup}
				/>
			</div>
		)
	}

	return (
		<>
			<AdminLayout currentAdmin={currentAdmin} onLogout={handleLogout}>
				<Routes>
					<Route path="/" element={<AdminDashboard currentAdmin={currentAdmin} />} />
					<Route path="/blogs" element={<BlogManagement />} />
					<Route path="/blog-detail/:id" element={<AdminBlogDetail />} />
					<Route path="/profile" element={<AdminProfile currentAdmin={currentAdmin} />} />
					<Route path="/admins" element={<AdminManagement />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="*" element={<Navigate to="/admin" replace />} />
				</Routes>
			</AdminLayout>
		</>
	)
}

export default AdminApp

