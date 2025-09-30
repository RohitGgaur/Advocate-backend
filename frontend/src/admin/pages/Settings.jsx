import { useState, useEffect } from 'react'
import apiService from '../../services/api'

function Settings() {
	const [settings, setSettings] = useState({
		siteName: 'Judicioworks Advocates and Associates',
		siteDescription: 'The Group Of Advocates You Need',
		contactEmail: 'info@judicioworks.com',
		contactPhone: '+91-9876543210',
		address: 'Office No 1002, 10th Floor, Galaxy Diamond Plaza, Greater Noida West',
		workingHours: '9:00 AM - 6:00 PM (Mon-Fri)',
		socialMedia: {
			facebook: 'https://www.facebook.com/people/Judicioworks-Advocates-And-Associates/61580457930212/?rdid=prvW1VFuVFCvMmCa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F173DVDUoYn%2F',
			twitter: '',
			linkedin: '',
			instagram: ''
		}
	})
	const [loading, setLoading] = useState(false)
	const [saving, setSaving] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name.includes('.')) {
			const [parent, child] = name.split('.')
			setSettings(prev => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: value
				}
			}))
		} else {
			setSettings(prev => ({
				...prev,
				[name]: value
			}))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setSaving(true)
			// In a real app, you would save these settings to the backend
			// For now, we'll just simulate saving
			await new Promise(resolve => setTimeout(resolve, 1000))
			alert('Settings saved successfully!')
		} catch (error) {
			console.error('Error saving settings:', error)
			alert('Failed to save settings')
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
					<p className="text-gray-600 mt-1">Manage website settings and configurations</p>
				</div>
			</div>

			{/* Test Content */}
			<div className="bg-white rounded-2xl shadow-lg p-6">
				<h2 className="text-xl font-bold text-gray-900 mb-4">Settings Page</h2>
				<p className="text-gray-600">This is the settings page. If you can see this, the routing is working!</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* General Settings */}
				<div className="bg-white rounded-2xl shadow-lg p-6">
					<h3 className="text-xl font-bold text-gray-900 mb-6">General Settings</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Site Name
							</label>
							<input
								type="text"
								name="siteName"
								value={settings.siteName}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Site Description
							</label>
							<input
								type="text"
								name="siteDescription"
								value={settings.siteDescription}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
					</div>
				</div>

				{/* Contact Information */}
				<div className="bg-white rounded-2xl shadow-lg p-6">
					<h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Contact Email
							</label>
							<input
								type="email"
								name="contactEmail"
								value={settings.contactEmail}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Contact Phone
							</label>
							<input
								type="tel"
								name="contactPhone"
								value={settings.contactPhone}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Address
							</label>
							<textarea
								name="address"
								value={settings.address}
								onChange={handleChange}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Working Hours
							</label>
							<input
								type="text"
								name="workingHours"
								value={settings.workingHours}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
					</div>
				</div>

				{/* Social Media */}
				<div className="bg-white rounded-2xl shadow-lg p-6">
					<h3 className="text-xl font-bold text-gray-900 mb-6">Social Media Links</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Facebook URL
							</label>
							<input
								type="url"
								name="socialMedia.facebook"
								value={settings.socialMedia.facebook}
								onChange={handleChange}
								placeholder="https://facebook.com/yourpage"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Twitter URL
							</label>
							<input
								type="url"
								name="socialMedia.twitter"
								value={settings.socialMedia.twitter}
								onChange={handleChange}
								placeholder="https://twitter.com/yourhandle"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								LinkedIn URL
							</label>
							<input
								type="url"
								name="socialMedia.linkedin"
								value={settings.socialMedia.linkedin}
								onChange={handleChange}
								placeholder="https://linkedin.com/company/yourcompany"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Instagram URL
							</label>
							<input
								type="url"
								name="socialMedia.instagram"
								value={settings.socialMedia.instagram}
								onChange={handleChange}
								placeholder="https://instagram.com/yourhandle"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
							/>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={saving}
						className="px-8 py-3 bg-brand text-white rounded-lg font-medium hover:bg-brand/90 transition-colors disabled:opacity-50"
					>
						{saving ? 'Saving...' : 'Save Settings'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Settings
