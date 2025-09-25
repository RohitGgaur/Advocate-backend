import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiService from '../../services/api'

function AdminBlogDetail() {
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
			console.log('Admin Blog detail response:', response)
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
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	const goBack = () => {
		navigate('/admin/blog-management')
	}

	const handleEdit = () => {
		navigate(`/admin/blog-management?edit=${id}`)
	}

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this blog?')) {
			try {
				await apiService.deleteBlog(id)
				alert('Blog deleted successfully!')
				navigate('/admin/blog-management')
			} catch (error) {
				console.error('Error deleting blog:', error)
				alert(`Error: ${error.message || 'Failed to delete blog'}`)
			}
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="text-gray-600 mt-4">Loading blog details...</p>
				</div>
			</div>
		)
	}

	if (error || !blog) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
						<div className="text-6xl mb-4">❌</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Not Found</h3>
						<p className="text-gray-600 mb-4">The blog you're looking for doesn't exist or has been removed.</p>
						<button 
							onClick={goBack}
							className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
						>
							← Back to Blog Management
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
					<div className="flex items-center justify-between">
						<div>
							<button 
								onClick={goBack}
								className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group mb-4"
							>
								<svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
								Back to Blog Management
							</button>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Details</h1>
							<p className="text-gray-600">Complete information about this blog post</p>
						</div>
						<div className="flex space-x-3">
							<button
								onClick={handleEdit}
								className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								<span>Edit Blog</span>
							</button>
							<button
								onClick={handleDelete}
								className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								<span>Delete Blog</span>
							</button>
						</div>
					</div>
				</div>

				{/* Blog Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Blog Image */}
						{blog.image && (
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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

						{/* Blog Title */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								{blog.title || 'Untitled Blog'}
							</h2>
							{blog.excerpt && (
								<p className="text-lg text-gray-600 leading-relaxed">
									{blog.excerpt}
								</p>
							)}
						</div>

						{/* Blog Content */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h3 className="text-xl font-bold text-gray-900 mb-4">Content</h3>
							<div 
								className="prose max-w-none text-gray-700 leading-relaxed"
								dangerouslySetInnerHTML={{ 
									__html: blog.content || 'No content available.' 
								}}
							/>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Blog Info */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4">Blog Information</h3>
							<div className="space-y-4">
								<div>
									<label className="text-sm font-medium text-gray-500">Status</label>
									<div className="mt-1">
										<span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
											blog.status === 'published' 
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'
										}`}>
											{blog.status}
										</span>
									</div>
								</div>
								
								<div>
									<label className="text-sm font-medium text-gray-500">Created</label>
									<p className="mt-1 text-gray-900">
										{formatDate(blog.createdAt || blog.created_at || new Date())}
									</p>
								</div>

								<div>
									<label className="text-sm font-medium text-gray-500">Updated</label>
									<p className="mt-1 text-gray-900">
										{formatDate(blog.updatedAt || blog.updated_at || blog.createdAt || blog.created_at || new Date())}
									</p>
								</div>

								<div>
									<label className="text-sm font-medium text-gray-500">Views</label>
									<p className="mt-1 text-gray-900">{blog.views || 0}</p>
								</div>

								<div>
									<label className="text-sm font-medium text-gray-500">Author</label>
									<p className="mt-1 text-gray-900">{blog.author?.username || 'Admin'}</p>
								</div>
							</div>
						</div>

						{/* Image URL */}
						{blog.image && (
							<div className="bg-white rounded-2xl shadow-lg p-6">
								<h3 className="text-lg font-bold text-gray-900 mb-4">Image URL</h3>
								<div className="bg-gray-50 rounded-lg p-3">
									<code className="text-sm text-gray-700 break-all">
										{blog.image}
									</code>
								</div>
								<button
									onClick={() => {
										navigator.clipboard.writeText(blog.image)
										alert('Image URL copied to clipboard!')
									}}
									className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
								>
									Copy URL
								</button>
							</div>
						)}

						{/* Quick Actions */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
							<div className="space-y-3">
								<button
									onClick={() => window.open(`/blog/${blog._id}`, '_blank')}
									className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
									<span>View Public Page</span>
								</button>
								
								<button
									onClick={() => window.print()}
									className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
									</svg>
									<span>Print</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminBlogDetail

