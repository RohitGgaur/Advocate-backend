import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '../../services/api'

function AdminDashboard({ currentAdmin }) {
	const navigate = useNavigate()
	const [adminData, setAdminData] = useState(null)
	const [stats, setStats] = useState({
		totalBlogs: 0,
		publishedBlogs: 0,
		draftBlogs: 0,
		totalViews: 0
	})
	const [loading, setLoading] = useState(true)
	const [adminLoading, setAdminLoading] = useState(true)
	
	// Global refresh system
	useEffect(() => {
		// Expose refresh function globally
		window.refreshDashboardStats = loadStats
		
		// Listen for blog changes
		const handleBlogChange = () => {
			console.log('Blog change detected, refreshing stats...')
			loadStats()
		}
		
		// Listen for profile changes
		const handleProfileChange = (event) => {
			console.log('Profile change detected:', event.detail)
			// Update adminData if needed
			if (event.detail?.updatedAdmin) {
				setAdminData(event.detail.updatedAdmin)
				// Update localStorage with new admin data
				localStorage.setItem('adminData', JSON.stringify(event.detail.updatedAdmin))
				// Trigger a custom event to update parent component
				window.dispatchEvent(new CustomEvent('adminDataUpdated', { 
					detail: { updatedAdmin: event.detail.updatedAdmin } 
				}))
			}
		}
		
		// Add event listeners
		window.addEventListener('blogChanged', handleBlogChange)
		window.addEventListener('profileChanged', handleProfileChange)
		
		return () => {
			delete window.refreshDashboardStats
			window.removeEventListener('blogChanged', handleBlogChange)
			window.removeEventListener('profileChanged', handleProfileChange)
		}
	}, [])

	useEffect(() => {
		loadStats()
		loadAdminData()
	}, [])

	const loadAdminData = async () => {
		try {
			setAdminLoading(true)
			const response = await apiService.getProfile()
			
			if (response.success && response.admin) {
				setAdminData(response.admin)
			} else {
				throw new Error('Invalid response from backend')
			}
		} catch (error) {
			console.error('Error loading profile:', error)
			setAdminData(null)
		} finally {
			setAdminLoading(false)
		}
	}

	const loadStats = async () => {
		try {
			const response = await apiService.getBlogStats()
			
			if (response.success && response.stats) {
				setStats({
					totalBlogs: response.stats.total_blogs || 0,
					publishedBlogs: response.stats.published_blogs || 0,
					draftBlogs: response.stats.draft_blogs || 0,
					totalViews: response.stats.total_views || 0
				})
			} else {
				setStats({
					totalBlogs: 0,
					publishedBlogs: 0,
					draftBlogs: 0,
					totalViews: 0
				})
			}
		} catch (error) {
			console.error('Error loading stats:', error)
			setStats({
				totalBlogs: 0,
				publishedBlogs: 0,
				draftBlogs: 0,
				totalViews: 0
			})
		} finally {
			setLoading(false)
		}
	}

	// Handle Create New Blog click
	const handleCreateBlog = () => {
		navigate('blogs?create=true')
	}

	const statsData = [
		{ title: 'Total Blogs', value: stats.totalBlogs || 0, icon: '📝', color: 'bg-blue-500' },
		{ title: 'Published', value: stats.publishedBlogs || 0, icon: '✅', color: 'bg-green-500' },
		{ title: 'Drafts', value: stats.draftBlogs || 0, icon: '📄', color: 'bg-yellow-500' },
		{ title: 'Views', value: (stats.totalViews || 0).toLocaleString(), icon: '👁️', color: 'bg-purple-500' },
	]

	if (loading || adminLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		)
	}

	// If no admin data, show error
	if (!adminData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-500 text-6xl mb-4">❌</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Admin Data</h2>
					<p className="text-gray-600 mb-4">Please check if backend server is running and try again.</p>
					<button
						onClick={() => {
							loadAdminData()
							loadStats()
						}}
						className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
					>
						🔄 Retry
					</button>
				</div>
			</div>
		)
	}

	// Debug logging for render
	console.log('🎨 AdminDashboard: Rendering with adminData:', adminData)
	console.log('🎨 AdminDashboard: adminData type:', typeof adminData)
	console.log('🎨 AdminDashboard: adminData username:', adminData?.username)
	console.log('🎨 AdminDashboard: adminData _id:', adminData?._id)

	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
							Welcome back, {adminData?.username || 'Admin'}!
						</h1>
						<p className="text-sm sm:text-base text-gray-600">
							Manage your website content and monitor performance. 
							{adminData?.role && ` You are logged in as ${adminData.role}.`}
						</p>
						{adminData?._id && (
							<p className="text-xs sm:text-sm text-gray-500 mt-1">
								Admin ID: {adminData._id}
							</p>
						)}
					</div>
					<button
						onClick={loadStats}
						className="px-3 sm:px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm sm:text-base"
					>
						🔄 Refresh Stats
					</button>
				</div>
			</div>


			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{statsData.map((stat, index) => (
					<div key={index} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
								<p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
							</div>
							<div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-full flex items-center justify-center`}>
								<span className="text-lg sm:text-2xl">{stat.icon}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Quick Actions */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
					<button 
						onClick={handleCreateBlog}
						className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group cursor-pointer"
					>
						<span className="text-xl sm:text-2xl mr-3 group-hover:scale-110 transition-transform">📝</span>
						<div className="text-left">
							<p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-blue-700">Create New Blog</p>
							<p className="text-xs sm:text-sm text-gray-600">Go to Blog Management</p>
						</div>
					</button>
					<button className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
						<span className="text-xl sm:text-2xl mr-3">📊</span>
						<div className="text-left">
							<p className="text-sm sm:text-base font-medium text-gray-900">View Analytics</p>
							<p className="text-xs sm:text-sm text-gray-600">Check website stats</p>
						</div>
					</button>
					<button className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
						<span className="text-xl sm:text-2xl mr-3">⚙️</span>
						<div className="text-left">
							<p className="text-sm sm:text-base font-medium text-gray-900">Settings</p>
							<p className="text-xs sm:text-sm text-gray-600">Manage preferences</p>
						</div>
					</button>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
				<div className="space-y-3">
					<div className="flex items-center p-3 bg-gray-50 rounded-lg">
						<span className="text-base sm:text-lg mr-3">📝</span>
						<div>
							<p className="text-sm sm:text-base font-medium text-gray-900">New blog post created</p>
							<p className="text-xs sm:text-sm text-gray-600">"Legal Updates 2024" - 2 hours ago</p>
						</div>
					</div>
					<div className="flex items-center p-3 bg-gray-50 rounded-lg">
						<span className="text-base sm:text-lg mr-3">✅</span>
						<div>
							<p className="text-sm sm:text-base font-medium text-gray-900">Blog post published</p>
							<p className="text-xs sm:text-sm text-gray-600">"Family Law Guide" - 1 day ago</p>
						</div>
					</div>
					<div className="flex items-center p-3 bg-gray-50 rounded-lg">
						<span className="text-base sm:text-lg mr-3">👁️</span>
						<div>
							<p className="text-sm sm:text-base font-medium text-gray-900">High traffic on blog</p>
							<p className="text-xs sm:text-sm text-gray-600">"Criminal Law Basics" - 2 days ago</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
