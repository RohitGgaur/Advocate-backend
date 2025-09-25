import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiService from '../services/api'

function BlogDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [blog, setBlog] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		loadBlog()
	}, [id])

	const loadBlog = async () => {
		try {
			setLoading(true)
			const response = await apiService.getBlog(id)
			console.log('Blog detail response:', response)
			setBlog(response.blog)
		} catch (error) {
			console.error('Error loading blog:', error)
			setError('Failed to load blog')
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

	const goBack = () => {
		navigate('/blog')
	}

	if (loading) {
		return (
			<div style={{ backgroundColor: '#8b8b8b', minHeight: '100vh' }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
						<p className="text-gray-600 mt-4">Loading blog...</p>
					</div>
				</div>
			</div>
		)
	}

	if (error || !blog) {
		return (
			<div style={{ backgroundColor: '#8b8b8b', minHeight: '100vh' }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="text-center py-12">
						<div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
							<div className="text-6xl mb-4">❌</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Not Found</h3>
							<p className="text-gray-600 mb-4">The blog you're looking for doesn't exist or has been removed.</p>
							<button 
								onClick={goBack}
								className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
							>
								← Back to Blog
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div style={{ backgroundColor: '#8b8b8b', minHeight: '100vh' }}>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Back Button */}
				<button 
					onClick={goBack}
					className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
				>
					<svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					Back to Blog
				</button>

				{/* Blog Content - Simple Design */}
				<article className="space-y-8">
					{/* Blog Image */}
					{blog.image && (
						<div className="relative overflow-hidden rounded-2xl shadow-lg">
							<img
								src={blog.image}
								alt={blog.title}
								className="w-full h-64 md:h-80 object-cover"
								onError={(e) => {
									e.target.src = 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 1000)
								}}
							/>
						</div>
					)}

					{/* Blog Meta - Simple Design */}
					<div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
						<div className="flex items-center space-x-4">
							<span className="flex items-center space-x-1">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span>{formatDate(blog.createdAt || blog.created_at || new Date())}</span>
							</span>
							<span>•</span>
							<span className="flex items-center space-x-1">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								<span>By {blog.author?.username || 'Admin'}</span>
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold text-white">
								{blog.category || 'General'}
							</span>
						</div>
					</div>

					{/* Blog Title */}
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
						{blog.title || 'Untitled Blog'}
					</h1>

					{/* Blog Excerpt */}
					{blog.excerpt && (
						<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-500">
							<p className="text-lg text-gray-700 leading-relaxed">
								{blog.excerpt}
							</p>
						</div>
					)}

					{/* Blog Content - Simple and Clean */}
					<div className="prose prose-lg max-w-none">
						<div 
							className="text-gray-700 leading-relaxed space-y-6 text-lg"
							dangerouslySetInnerHTML={{ 
								__html: blog.content || 'No content available.' 
							}}
						/>
					</div>

					{/* Blog Tags */}
					{blog.tags && blog.tags.length > 0 && (
						<div className="pt-6 border-t border-gray-300">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
							<div className="flex flex-wrap gap-2">
								{blog.tags.map((tag, index) => (
									<span 
										key={index}
										className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors cursor-pointer"
									>
										#{tag}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="pt-6 border-t border-gray-300 flex flex-wrap gap-4">
						<button 
							onClick={goBack}
							className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center shadow-lg"
						>
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to Blog
						</button>
						<button 
							onClick={() => window.print()}
							className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center border border-gray-300"
						>
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
							</svg>
							Print
						</button>
					</div>
				</article>
			</div>
		</div>
	)
}

export default BlogDetail
