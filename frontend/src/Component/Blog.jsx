import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/api'

function Blog() {
	const navigate = useNavigate()
	const [blogs, setBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		console.log('🔄 User - Component mounted, loading blogs...')
		loadBlogs()
		
		// Listen for blog changes to refresh the user blog page
		const handleBlogChange = () => {
			console.log('🔄 User - Blog change detected, refreshing user blog page...')
			loadBlogs()
		}
		
		window.addEventListener('blogChanged', handleBlogChange)
		
		return () => {
			window.removeEventListener('blogChanged', handleBlogChange)
		}
	}, [])
	
	// Force refresh when component becomes visible
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (!document.hidden) {
				console.log('🔄 User - Page became visible, refreshing blogs...')
				loadBlogs()
			}
		}
		
		document.addEventListener('visibilitychange', handleVisibilityChange)
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
	}, [])

	const loadBlogs = async () => {
		try {
			console.log('🔄 User - Starting to load published blogs...')
			setLoading(true)
			const response = await apiService.getBlogs({ status: 'published' })
			console.log('📊 User - Full response:', response)
			console.log('📊 User - Response success:', response.success)
			console.log('📊 User - Blogs array:', response.blogs)
			console.log('📊 User - Blogs count:', response.blogs?.length || 0)
			
			if (response.blogs && response.blogs.length > 0) {
				console.log('📊 User - First blog:', response.blogs[0])
				console.log('📊 User - First blog title:', response.blogs[0].title)
				console.log('📊 User - First blog content:', response.blogs[0].content)
				console.log('📊 User - First blog excerpt:', response.blogs[0].excerpt)
				console.log('📊 User - First blog image:', response.blogs[0].image)
			} else {
				console.log('⚠️ User - No published blogs found in response')
			}
			
			setBlogs(response.blogs || [])
			console.log('✅ User - Blogs state updated with', response.blogs?.length || 0, 'blogs')
		} catch (error) {
			console.error('❌ User - Error loading blogs:', error)
			setError('Failed to load blogs: ' + error.message)
		} finally {
			setLoading(false)
		}
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const fixImageUrl = (url) => {
		// Use the exact URL as provided by admin, no changes
		return url
	}

	const handleReadMore = (blogId) => {
		navigate(`/blog/${blogId}`)
	}

	return (
		<div style={{ backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
			<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
				<div className="text-center mb-8 md:mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 relative">
						Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Blog</span>
					</h1>
					<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 md:mb-8">
						(Insights, updates, and legal tips from our experienced advocates)
					</p>
					<div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
				</div>

			{loading ? (
				<div className="text-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
					<p className="text-gray-600 mt-4">Loading blogs...</p>
				</div>
			) : error ? (
				<div className="text-center py-12">
					<p className="text-red-600">{error}</p>
					<button 
						onClick={loadBlogs}
						className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
					>
						Try Again
					</button>
				</div>
			) : blogs.length === 0 ? (
				<div className="text-center py-12">
					<div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
						<div className="text-6xl mb-4">📝</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No Blogs Yet</h3>
						<p className="text-gray-600">No blogs available at the moment. Check back soon!</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((blog) => (
						<article 
							key={blog._id} 
							className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group shadow-lg hover:-translate-y-1 border border-gray-200 flex flex-col h-full"
						>
							{/* Blog Image */}
							{blog.image && (
								<div className="relative h-48 w-full overflow-hidden">
									<img
										src={blog.image}
										alt={blog.title || 'Blog Image'}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										onLoad={() => console.log('User blog image loaded:', blog.image)}
										onError={(e) => {
											console.log('User blog image failed:', blog.image)
											e.target.src = 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000)
										}}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
								</div>
							)}

							{/* Category Badge */}
							<div className="p-4 pb-0">
								<span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
									{blog.category || 'General'}
								</span>
							</div>

							{/* Content - Compact Design */}
							<div className="p-5 flex flex-col flex-grow">
								{/* Date Only - Removed Views */}
								<div className="mb-3">
									<span className="text-xs text-gray-500 font-medium">
										{formatDate(blog.createdAt || blog.created_at || new Date())}
									</span>
								</div>

								{/* Title */}
								<h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
									{blog.title || 'Untitled Blog'}
								</h3>

								{/* Excerpt - Shorter */}
								<p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
									{blog.excerpt || (blog.content ? blog.content.substring(0, 100) + '...' : 'No excerpt available')}
								</p>

								{/* Author and Read More - Compact */}
								<div className="flex items-center justify-between mt-auto">
									<div className="flex items-center space-x-2">
										<div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
											{(blog.author?.username || 'A').charAt(0).toUpperCase()}
										</div>
										<span className="text-xs text-gray-500">
											{blog.author?.username || 'Admin'}
										</span>
									</div>
									<button 
										className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-1 shadow-lg"
										onClick={() => handleReadMore(blog._id)}
									>
										<span>Read More</span>
										<svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
		</div>
	)
}

export default Blog 