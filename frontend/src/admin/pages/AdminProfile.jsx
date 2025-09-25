import { useState, useEffect } from 'react'
import apiService from '../../services/api'

function AdminProfile({ currentAdmin }) {
	const [profile, setProfile] = useState({
		username: '',
		email: '',
		role: '',
		is_active: true,
		createdAt: '',
		updatedAt: '',
		last_login: ''
	})
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		username: '',
		email: ''
	})

	// Load profile data from backend on component mount
	useEffect(() => {
		const loadProfile = async () => {
			try {
				setLoading(true)
				console.log('🔄 Loading profile from backend...')
				
				// First try to get fresh data from backend
				const response = await apiService.getProfile()
				console.log('📊 Backend profile response:', response)
				
				if (response.success && response.admin) {
					const backendAdmin = response.admin
					console.log('✅ Backend admin data received:', backendAdmin)
					
					// Update localStorage with fresh backend data
					localStorage.setItem('adminData', JSON.stringify(backendAdmin))
					console.log('💾 Updated localStorage with backend data')
					
					// Update local state with backend data
					setProfile(backendAdmin)
					setFormData({
						username: backendAdmin.username || '',
						email: backendAdmin.email || ''
					})
					console.log('🔄 Updated local state with backend data')
					
					console.log('✅ Profile loaded successfully from backend')
				} else {
					console.error('❌ Invalid response from backend:', response)
					throw new Error('Invalid response from backend')
				}
			} catch (error) {
				console.error('❌ Error loading profile from backend:', error)
				
				// Show error message instead of fallback
				alert(`Error loading profile: ${error.message}. Please check if backend server is running.`)
				
				// Set empty profile to show error state
				setProfile({
					username: '',
					email: '',
					role: '',
					is_active: false,
					createdAt: '',
					updatedAt: '',
					last_login: ''
				})
				setFormData({
					username: '',
					email: ''
				})
			} finally {
				setLoading(false)
				console.log('🏁 Loading completed')
			}
		}
		
		loadProfile()
	}, []) // Remove currentAdmin dependency to avoid conflicts

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setSaving(true)
			console.log('🔄 Starting profile update...')
			console.log('🔄 Form data to update:', formData)
			
			// Clean form data - remove mock ID and other unnecessary fields
			const cleanFormData = {
				username: formData.username,
				email: formData.email
			}
			
			console.log('🔄 Cleaned form data:', cleanFormData)
			
			// Call API to update profile
			const response = await apiService.updateProfile(cleanFormData)
			console.log('📊 Profile update response:', response)
			
			if (response.success && response.admin) {
				// Update local state with response data
				const updatedProfile = response.admin
				console.log('✅ Received updated profile from backend:', updatedProfile)
				
				setProfile(updatedProfile)
				setFormData({
					username: updatedProfile.username || '',
					email: updatedProfile.email || ''
				})
				console.log('🔄 Updated local state with new profile data')
				
				// Update localStorage with new data from API response
				localStorage.setItem('adminData', JSON.stringify(updatedProfile))
				console.log('💾 Updated localStorage with new profile data')
				
				// Dispatch profile change event for real-time updates
				window.dispatchEvent(new CustomEvent('profileChanged', { 
					detail: { updatedAdmin: updatedProfile } 
				}))
				console.log('📡 Dispatched profileChanged event')
				
				// Also dispatch admin data update event
				window.dispatchEvent(new CustomEvent('adminDataUpdated', { 
					detail: { updatedAdmin: updatedProfile } 
				}))
				console.log('📡 Dispatched adminDataUpdated event')
				
				setIsEditing(false)
				alert('✅ Profile updated successfully!')
				console.log('✅ Profile update completed successfully')
			} else {
				console.error('❌ Invalid update response:', response)
				throw new Error(response.message || 'Update failed')
			}
		} catch (error) {
			console.error('❌ Error updating profile:', error)
			alert(`❌ Error: ${error.message || 'Failed to update profile'}`)
		} finally {
			setSaving(false)
			console.log('🏁 Update process completed')
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading profile...</p>
				</div>
			</div>
		)
	}

	if (!profile.username) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<p className="text-gray-600">No profile data available</p>
					<button 
						onClick={() => window.location.reload()} 
						className="mt-4 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90"
					>
						Refresh Page
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<h1 className="text-xl sm:text-3xl font-bold text-gray-900">Admin Profile</h1>
				<button
					onClick={() => setIsEditing(!isEditing)}
					disabled={saving}
					className="bg-brand text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-brand/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
				>
					{saving ? 'Saving...' : isEditing ? 'Cancel' : 'Edit Profile'}
				</button>
			</div>


			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
				{/* Profile Card */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center">
						<div className="w-16 h-16 sm:w-24 sm:h-24 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
							<span className="text-white text-xl sm:text-3xl font-bold">
								{profile.username?.charAt(0).toUpperCase() || 'A'}
							</span>
						</div>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{profile.username}</h2>
						<p className="text-sm sm:text-base text-gray-600 mb-4">{profile.role}</p>
						<div className="space-y-2 text-xs sm:text-sm text-gray-500">
							<p>Joined: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
							<p>Last Updated: {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}</p>
							<p>Last Login: {profile.last_login ? new Date(profile.last_login).toLocaleDateString() : 'Never'}</p>
						</div>
					</div>
				</div>

				{/* Profile Details */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
						<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Information</h3>
						
						{isEditing ? (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
										Username
									</label>
									<input
										type="text"
										name="username"
										value={formData.username}
										onChange={handleChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-sm sm:text-base"
									/>
								</div>

								<div>
									<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
										Email Address
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-sm sm:text-base"
									/>
								</div>

								<div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => setIsEditing(false)}
										className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-4 sm:px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm sm:text-base"
									>
										Save Changes
									</button>
								</div>
							</form>
						) : (
							<div className="space-y-3 sm:space-y-4">
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Username</span>
									<span className="text-gray-900 text-sm sm:text-base">{profile.username}</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Email Address</span>
									<span className="text-gray-900 text-sm sm:text-base break-all">{profile.email}</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Role</span>
									<span className="text-gray-900 text-sm sm:text-base">{profile.role}</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Status</span>
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${
										profile.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
									}`}>
										{profile.is_active ? 'Active' : 'Inactive'}
									</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Join Date</span>
									<span className="text-gray-900 text-sm sm:text-base">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Last Updated</span>
									<span className="text-gray-900 text-sm sm:text-base">{profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}</span>
								</div>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3">
									<span className="font-medium text-gray-700 text-xs sm:text-sm">Last Login</span>
									<span className="text-gray-900 text-sm sm:text-base">{profile.last_login ? new Date(profile.last_login).toLocaleDateString() : 'Never'}</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Activity Stats */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Activity Statistics</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
					<div className="text-center">
						<div className="text-2xl sm:text-3xl font-bold text-brand mb-2">12</div>
						<div className="text-sm sm:text-base text-gray-600">Blogs Created</div>
					</div>
					<div className="text-center">
						<div className="text-2xl sm:text-3xl font-bold text-brand mb-2">10</div>
						<div className="text-sm sm:text-base text-gray-600">Blogs Published</div>
					</div>
					<div className="text-center">
						<div className="text-2xl sm:text-3xl font-bold text-brand mb-2">1,234</div>
						<div className="text-sm sm:text-base text-gray-600">Total Views</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminProfile
