import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModal from './components/AuthModal'
import apiService from '../services/api'

function AuthPage() {
	const [showAuthModal, setShowAuthModal] = useState(true)
	const [authMode, setAuthMode] = useState('login')
	const navigate = useNavigate()

	const handleLogin = async (formData) => {
		try {
			console.log('Attempting login with:', formData.email)
			
			// For testing - create a mock admin data
			const mockAdmin = {
				_id: 'admin_123',
				username: formData.email.split('@')[0],
				email: formData.email,
				role: 'admin',
				is_active: true,
				created_at: new Date().toISOString(),
				last_login: new Date().toISOString()
			}
			
			console.log('Mock login response:', mockAdmin)
			
			// Store admin data in localStorage
			localStorage.setItem('adminData', JSON.stringify(mockAdmin))
			
			console.log('Login successful, admin data stored, redirecting to dashboard')
			
			// Add a small delay to ensure localStorage is updated
			setTimeout(() => {
				navigate('/admin/dashboard')
			}, 100)
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
			
			// For testing - create a mock admin data
			const mockAdmin = {
				_id: 'admin_123',
				username: formData.username,
				email: formData.email,
				role: 'admin',
				is_active: true,
				created_at: new Date().toISOString(),
				last_login: new Date().toISOString()
			}
			
			console.log('Mock signup response:', mockAdmin)
			
			// Store admin data in localStorage
			localStorage.setItem('adminData', JSON.stringify(mockAdmin))
			
			console.log('Signup successful, admin data stored, redirecting to dashboard')
			
			// Add a small delay to ensure localStorage is updated
			setTimeout(() => {
				navigate('/admin/dashboard')
			}, 100)
		} catch (error) {
			console.error('Signup error:', error)
			alert(error.message || 'Registration failed')
		}
	}

	const switchAuthMode = () => {
		setAuthMode(authMode === 'login' ? 'signup' : 'login')
	}

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

export default AuthPage
