import { useState, useEffect } from 'react'

function WelcomePopup() {
	const [isVisible, setIsVisible] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: ''
	})
	const [isSubmitted, setIsSubmitted] = useState(false)

	useEffect(() => {
		// Show popup every time site loads (after 2 seconds)
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 2000)
		
		return () => clearTimeout(timer)
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (formData.name.trim() && formData.email.trim()) {
			// Save user data (you can also send this to your backend)
			localStorage.setItem('userData', JSON.stringify(formData))
			setIsSubmitted(true)
			
			// Hide popup after 2 seconds
			setTimeout(() => {
				setIsVisible(false)
			}, 2000)
		}
	}

	const handleClose = () => {
		setIsVisible(false)
	}

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	if (!isVisible) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-fade-in">
				{/* Close Button */}
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
				>
					<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{/* Header */}
				<div className="text-center mb-6">
					<div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
						<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Judicioworks Advocates and Associates!</h2>
					<p className="text-gray-600">We'd love to know more about you</p>
				</div>

				{/* Form */}
				{!isSubmitted ? (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
								Full Name *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 outline-none"
								placeholder="Enter your full name"
							/>
						</div>
						
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email Address *
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 outline-none"
								placeholder="Enter your email address"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-brand text-white py-3 px-6 rounded-xl font-semibold hover:bg-brand/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							Get Started
						</button>
					</form>
				) : (
					/* Success Message */
					<div className="text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
						<p className="text-gray-600">Welcome to Judicioworks Advocates and Associates family!</p>
					</div>
				)}

				{/* Footer */}
				<div className="text-center mt-6">
					<p className="text-xs text-gray-500">
						By continuing, you agree to our{' '}
						<a href="#" className="text-brand hover:underline">Privacy Policy</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default WelcomePopup
