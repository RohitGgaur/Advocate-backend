import { useState, useEffect } from 'react'

function DisclaimerPopup() {
	const [isVisible, setIsVisible] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		// Ensure component is fully loaded
		setIsLoaded(true)
		
		// Check if user has already agreed to disclaimer
		const checkDisclaimer = () => {
			try {
				const hasAgreed = localStorage.getItem('disclaimerAgreed')
				console.log('🔍 Disclaimer check - hasAgreed:', hasAgreed)
				
				if (!hasAgreed) {
					console.log('📢 Showing disclaimer popup')
					// Show popup after a short delay to ensure page is loaded
					const timer = setTimeout(() => {
						setIsVisible(true)
						console.log('✅ Disclaimer popup is now visible')
					}, 1500)
					
					return () => clearTimeout(timer)
				} else {
					console.log('✅ User has already agreed to disclaimer')
				}
			} catch (error) {
				console.error('❌ Error checking disclaimer:', error)
				// If there's an error with localStorage, show the popup anyway
				setTimeout(() => {
					setIsVisible(true)
				}, 1500)
			}
		}

		// Run check after component is loaded
		const timer = setTimeout(checkDisclaimer, 100)
		return () => clearTimeout(timer)
	}, [])

	const handleAgree = () => {
		try {
			localStorage.setItem('disclaimerAgreed', 'true')
			console.log('✅ User agreed to disclaimer, saved to localStorage')
			setIsVisible(false)
		} catch (error) {
			console.error('❌ Error saving disclaimer agreement:', error)
			// Still close the popup even if localStorage fails
			setIsVisible(false)
		}
	}

	const handleDisagree = () => {
		console.log('❌ User disagreed to disclaimer')
		// Close the popup but don't save agreement
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4">
				{/* Header */}
				<div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg">
					<h2 className="text-xl font-semibold text-center">Disclaimer</h2>
				</div>

				{/* Content */}
				<div className="px-6 py-6">
					<p className="text-gray-700 text-sm leading-relaxed mb-6">
						The contents of this website are for information purposes only and may not be construed as advertisement or solicitation in any manner whatsoever. By clicking the Enter tab, you have deemed to have requested the information of your own accord and volition and by no means, Judicioworks Advocates and Associates has invited you to visit the website for any purposes. The information provided under this website is solely available at your request for information purposes only. It should not be interpreted as soliciting or advertisement.
					</p>

					{/* Buttons */}
					<div className="flex gap-4">
						<button
							onClick={handleAgree}
							className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
						>
							Yes, I Agree
						</button>
						<button
							onClick={handleDisagree}
							className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
						>
							Disagree
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DisclaimerPopup
