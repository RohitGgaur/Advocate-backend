import { useState } from 'react'
import logo from '../../assets/logo.jpg'

function AuthModal({ isOpen, onClose, mode, onSwitchMode, onLogin, onSignup }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		username: '',
		confirmPassword: ''
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (mode === 'login') {
			onLogin(formData)
		} else {
			onSignup(formData)
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
				{/* Header with Logo */}
				<div className="flex flex-col items-center p-4 sm:p-6 border-b border-gray-200">
					<img src={logo} alt="Judicioworks" className="h-12 sm:h-16 w-auto mb-2 sm:mb-4" />
					<h2 className="text-xl sm:text-2xl font-bold text-gray-900">
						{mode === 'login' ? 'Admin Login' : 'Admin Signup'}
					</h2>
					<p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
						{mode === 'login' ? 'Sign in to your admin account' : 'Create your admin account'}
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
					{mode === 'signup' && (
						<div>
							<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
								Username
							</label>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
								placeholder="Enter your username"
							/>
						</div>
					)}

					<div>
						<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
							placeholder="Enter your email"
						/>
					</div>

					<div>
						<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
							placeholder="Enter your password"
						/>
					</div>

					{mode === 'signup' && (
						<div>
							<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
								placeholder="Confirm your password"
							/>
						</div>
					)}

					<button
						type="submit"
						className="w-full bg-brand text-white py-2 sm:py-2 px-4 rounded-lg font-medium hover:bg-brand/90 transition-colors duration-300 text-sm sm:text-base"
					>
						{mode === 'login' ? 'Sign In' : 'Sign Up'}
					</button>
				</form>

				{/* Footer */}
				<div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-b-2xl">
					<p className="text-center text-xs sm:text-sm text-gray-600">
						{mode === 'login' ? "Don't have an account? " : "Already have an account? "}
						<button
							onClick={onSwitchMode}
							className="text-brand hover:text-brand/80 font-medium"
						>
							{mode === 'login' ? 'Sign up' : 'Sign in'}
						</button>
					</p>
					<button
						onClick={onClose}
						className="w-full mt-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default AuthModal
