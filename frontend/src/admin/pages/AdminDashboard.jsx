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
	const [recentBlogs, setRecentBlogs] = useState([])
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
		loadRecentBlogs()
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
					totalBlogs: response.stats.totalBlogs || 0,
					publishedBlogs: response.stats.publishedBlogs || 0,
					draftBlogs: response.stats.draftBlogs || 0,
					totalViews: response.stats.totalViews || 0
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

	const loadRecentBlogs = async () => {
		try {
			const response = await apiService.getBlogs({ limit: 10 })
			if (response.success && response.blogs) {
				setRecentBlogs(response.blogs)
			}
		} catch (error) {
			console.error('Error loading recent blogs:', error)
			setRecentBlogs([])
		}
	}

	// Handle Create New Blog click
	const handleCreateBlog = () => {
		navigate('blogs?create=true')
	}

	// Handle stat card clicks
	const handleStatClick = (statType) => {
		switch(statType) {
			case 'total':
				navigate('blogs')
				break
			case 'published':
				navigate('blogs?filter=published')
				break
			case 'draft':
				navigate('blogs?filter=draft')
				break
			case 'views':
				navigate('blogs')
				break
			default:
				navigate('blogs')
		}
	}

	const statsData = [
		{ title: 'Total Blogs', value: stats.totalBlogs || 0, icon: '📝', color: 'bg-blue-500', type: 'total' },
		{ title: 'Published', value: stats.publishedBlogs || 0, icon: '✅', color: 'bg-green-500', type: 'published' },
		{ title: 'Drafts', value: stats.draftBlogs || 0, icon: '📄', color: 'bg-yellow-500', type: 'draft' },
		{ title: 'Views', value: (stats.totalViews || 0).toLocaleString(), icon: '👁️', color: 'bg-purple-500', type: 'views' },
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
						onClick={() => {
							loadStats()
							loadRecentBlogs()
						}}
						className="px-3 sm:px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm sm:text-base"
					>
						🔄 Refresh Data
					</button>
				</div>
			</div>


			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{statsData.map((stat, index) => (
					<div 
						key={index} 
						className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
						onClick={() => handleStatClick(stat.type)}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
								<p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
							</div>
							<div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-full flex items-center justify-center`}>
								<span className="text-lg sm:text-2xl">{stat.icon}</span>
							</div>
						</div>
						<div className="mt-2">
							<p className="text-xs text-gray-500">Click to view {stat.title.toLowerCase()}</p>
						</div>
					</div>
				))}
			</div>

			{/* Real-time Data Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
				{/* Recent Blogs */}
				<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Blogs</h2>
						<button 
							onClick={() => navigate('blogs')}
							className="text-sm text-blue-600 hover:text-blue-800 font-medium"
						>
							View All →
						</button>
					</div>
					<div className="space-y-3">
						{loading ? (
							<div className="flex justify-center py-4">
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
							</div>
						) : recentBlogs.length === 0 ? (
							<div className="text-center py-4 text-gray-500">
								<p className="text-sm">No blogs found</p>
								<button 
									onClick={handleCreateBlog}
									className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
								>
									Create your first blog
								</button>
							</div>
						) : (
							recentBlogs.slice(0, 5).map((blog) => (
								<div key={blog._id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate(`blogs`)}>
									<div className={`w-3 h-3 rounded-full mr-3 ${blog.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate">{blog.title}</p>
										<p className="text-xs text-gray-600">
											{blog.status === 'published' ? 'Published' : 'Draft'} • {new Date(blog.createdAt).toLocaleDateString()}
										</p>
									</div>
									<div className="text-xs text-gray-500 ml-2">
										{blog.views || 0} views
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* System Status */}
				<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
					<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">System Status</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div className="flex items-center">
								<div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
								<span className="text-sm font-medium text-gray-900">Backend Server</span>
							</div>
							<span className="text-xs text-green-600 font-medium">Online</span>
						</div>
						<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div className="flex items-center">
								<div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
								<span className="text-sm font-medium text-gray-900">Database</span>
							</div>
							<span className="text-xs text-green-600 font-medium">Connected</span>
						</div>
						<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div className="flex items-center">
								<div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
								<span className="text-sm font-medium text-gray-900">Last Updated</span>
							</div>
							<span className="text-xs text-gray-600">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div className="flex items-center">
								<div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
								<span className="text-sm font-medium text-gray-900">Active Sessions</span>
							</div>
							<span className="text-xs text-gray-600">1</span>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions - Simplified */}
			<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
				<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
				<div className="flex flex-wrap gap-3">
					<button 
						onClick={handleCreateBlog}
						className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						<span className="text-lg mr-2">📝</span>
						<span className="text-sm font-medium">Create New Blog</span>
					</button>
					<button 
						onClick={() => navigate('blogs')}
						className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
					>
						<span className="text-lg mr-2">📋</span>
						<span className="text-sm font-medium">Manage Blogs</span>
					</button>
					<button 
						onClick={loadStats}
						className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
					>
						<span className="text-lg mr-2">🔄</span>
						<span className="text-sm font-medium">Refresh Data</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
