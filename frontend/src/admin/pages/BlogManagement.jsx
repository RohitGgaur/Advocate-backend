import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import apiService from '../../services/api'

function BlogManagement() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [blogs, setBlogs] = useState([])
	const [filteredBlogs, setFilteredBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState('all') // all, published, draft

	const [showModal, setShowModal] = useState(false)
	const [showDetailModal, setShowDetailModal] = useState(false)
	const [viewingBlog, setViewingBlog] = useState(null)
	const [editingBlog, setEditingBlog] = useState(null)
	const [formData, setFormData] = useState({
		title: '',
		excerpt: '',
		content: '',
		image: '',
		status: 'draft'
	})
	const [selectedFile, setSelectedFile] = useState(null)
	const [imagePreview, setImagePreview] = useState(null)
	const [saving, setSaving] = useState(false)

	// Load blogs on component mount
	useEffect(() => {
		loadBlogs()
	}, [])

	// Handle URL parameters and filtering
	useEffect(() => {
		const filterParam = searchParams.get('filter')
		const createParam = searchParams.get('create')
		
		if (filterParam === 'published') {
			setFilter('published')
			loadPublishedBlogs()
		} else if (filterParam === 'draft') {
			setFilter('draft')
			loadDraftBlogs()
		} else {
			setFilter('all')
			loadBlogs()
		}
		
		if (createParam === 'true') {
			setShowModal(true)
			// Remove the create parameter from URL
			setSearchParams({})
		}
	}, [searchParams, setSearchParams])

	// Update filtered blogs when blogs change (no client-side filtering needed)
	useEffect(() => {
		setFilteredBlogs(blogs)
	}, [blogs])

	const loadBlogs = async () => {
		try {
			setLoading(true)
			// Load all blogs (published + drafts) for admin
			const response = await apiService.getBlogs()
			setBlogs(response.blogs || [])
		} catch (error) {
			console.error('Error loading blogs:', error)
			alert('Failed to load blogs: ' + error.message)
		} finally {
			setLoading(false)
		}
	}

	const loadPublishedBlogs = async () => {
		try {
			setLoading(true)
			const response = await apiService.getPublishedBlogs()
			setBlogs(response.blogs || [])
		} catch (error) {
			console.error('Error loading published blogs:', error)
			alert('Failed to load published blogs: ' + error.message)
		} finally {
			setLoading(false)
		}
	}

	const loadDraftBlogs = async () => {
		try {
			setLoading(true)
			const response = await apiService.getDraftBlogs()
			setBlogs(response.blogs || [])
		} catch (error) {
			console.error('Error loading draft blogs:', error)
			alert('Failed to load draft blogs: ' + error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		if (saving) return // Prevent multiple submissions
		
		// Use the exact image URL as provided by admin
		let fixedFormData = { ...formData }
		
		// IMMEDIATE TEST - This should show up
		alert('FORM SUBMISSION STARTED - CHECK CONSOLE FOR SIZE ANALYSIS')
		
		// Log sizes for debugging
		console.log('🚨🚨🚨 BLOG SUBMISSION SIZE ANALYSIS 🚨🚨🚨')
		console.log('📝 Title length:', fixedFormData.title?.length || 0, 'characters')
		console.log('📄 Excerpt length:', fixedFormData.excerpt?.length || 0, 'characters')
		console.log('📖 Content length:', fixedFormData.content?.length || 0, 'characters')
		console.log('🖼️ Image length:', fixedFormData.image?.length || 0, 'characters')
		console.log('🖼️ Image size in KB:', fixedFormData.image ? (fixedFormData.image.length * 0.75 / 1024).toFixed(2) : 0, 'KB (estimated)')
		console.log('🖼️ Image size in MB:', fixedFormData.image ? (fixedFormData.image.length * 0.75 / (1024 * 1024)).toFixed(2) : 0, 'MB (estimated)')
		console.log('📊 Total form data size:', JSON.stringify(fixedFormData).length, 'characters')
		console.log('📊 Total form data size in KB:', (JSON.stringify(fixedFormData).length / 1024).toFixed(2), 'KB')
		console.log('📊 Total form data size in MB:', (JSON.stringify(fixedFormData).length / (1024 * 1024)).toFixed(2), 'MB')
		console.log('🚨🚨🚨 END SIZE ANALYSIS 🚨🚨🚨')
		
		// Show size analysis in alert for debugging
		const totalSizeMB = (JSON.stringify(fixedFormData).length / (1024 * 1024)).toFixed(2)
		const imageSizeMB = fixedFormData.image ? (fixedFormData.image.length * 0.75 / (1024 * 1024)).toFixed(2) : 0
		alert(`SIZE ANALYSIS:\nTotal Size: ${totalSizeMB} MB\nImage Size: ${imageSizeMB} MB\nContent Length: ${fixedFormData.content?.length || 0} chars`)
		
		console.log('Submitting blog with formData:', fixedFormData)
		try {
			setSaving(true)
			
			if (editingBlog) {
				console.log('Updating blog:', editingBlog.id || editingBlog._id, fixedFormData)
				const blogId = editingBlog.id || editingBlog._id
				const response = await apiService.updateBlog(blogId, fixedFormData)
				console.log('Update response:', response)
				await loadBlogs() // Reload blogs
				alert('Blog updated successfully!')
			} else {
				console.log('Creating new blog:', fixedFormData)
				const response = await apiService.createBlog(fixedFormData)
				console.log('Create response:', response)
				await loadBlogs() // Reload blogs
				alert('Blog created successfully!')
			}
			
			// Dispatch blog change event for real-time updates
			window.dispatchEvent(new CustomEvent('blogChanged'))
			
			setShowModal(false)
			setEditingBlog(null)
			setFormData({ title: '', excerpt: '', content: '', image: '', status: 'draft' })
			setSelectedFile(null)
			setImagePreview(null)
		} catch (error) {
			console.error('Error saving blog:', error)
			alert(`Error: ${error.message || 'Failed to save blog'}`)
		} finally {
			setSaving(false)
		}
	}

	const handleViewDetails = (blog) => {
		setViewingBlog(blog)
		setShowDetailModal(true)
	}

	const handleEdit = (blog) => {
		setEditingBlog(blog)
		setFormData({
			title: blog.title,
			excerpt: blog.excerpt,
			content: blog.content || '',
			image: blog.image,
			status: blog.status
		})
		// Clear file selection when editing (using existing image)
		setSelectedFile(null)
		setImagePreview(null)
		setShowModal(true)
	}

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this blog?')) {
			try {
				console.log('Deleting blog with ID:', id)
				const response = await apiService.deleteBlog(id)
				console.log('Delete response:', response)
				await loadBlogs() // Reload blogs
				
				// Dispatch blog change event for real-time updates
				window.dispatchEvent(new CustomEvent('blogChanged'))
				alert('Blog deleted successfully!')
			} catch (error) {
				console.error('Error deleting blog:', error)
				alert(`Error: ${error.message || 'Failed to delete blog'}`)
			}
		}
	}

	const openModal = () => {
		setEditingBlog(null)
		setFormData({ title: '', excerpt: '', content: '', image: '', status: 'draft' })
		setSelectedFile(null)
		setImagePreview(null)
		setShowModal(true)
	}

	const fixImageUrl = (url) => {
		// Use the exact URL as provided by admin, no changes
		return url
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if (file) {
		// Check file size (limit to 50MB for base64 conversion - base64 makes files ~33% larger)
		const maxSize = 50 * 1024 * 1024 // 50MB (becomes ~67MB in base64)
		if (file.size > maxSize) {
			alert(`File too large for upload! Please use an image URL instead for files larger than ${maxSize / (1024 * 1024)}MB. Current file: ${(file.size / (1024 * 1024)).toFixed(1)}MB`)
			e.target.value = '' // Clear the input
			return
		}
			
			setSelectedFile(file)
			
			// Create preview URL
			const reader = new FileReader()
			reader.onload = (e) => {
				const base64Image = e.target.result
				console.log('🖼️ FILE UPLOAD SIZE ANALYSIS:')
				console.log('📁 Original file size:', (file.size / 1024).toFixed(2), 'KB')
				console.log('📁 Original file size:', (file.size / (1024 * 1024)).toFixed(2), 'MB')
				console.log('🔄 Base64 image length:', base64Image.length, 'characters')
				console.log('🔄 Base64 image size:', (base64Image.length / 1024).toFixed(2), 'KB')
				console.log('🔄 Base64 image size:', (base64Image.length / (1024 * 1024)).toFixed(2), 'MB')
				console.log('📈 Size increase:', ((base64Image.length / file.size) * 100).toFixed(1), '%')
				
				setImagePreview(base64Image)
				// Set the data URL as the image in formData
				setFormData({...formData, image: base64Image})
			}
			reader.readAsDataURL(file)
		}
	}

	const handleImageUrlChange = (e) => {
		const url = e.target.value
		console.log('🖼️ IMAGE URL UPDATE:')
		console.log('🔗 URL length:', url.length, 'characters')
		console.log('🔗 URL size:', (url.length / 1024).toFixed(2), 'KB')
		setFormData({...formData, image: url})
		// Clear file selection when URL is entered
		if (url) {
			setSelectedFile(null)
			setImagePreview(null)
		}
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<h1 className="text-xl sm:text-3xl font-bold text-gray-900">Blog Management</h1>
				<div className="flex space-x-3">
					<button
						onClick={openModal}
						className="bg-brand text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-brand/90 transition-colors text-sm sm:text-base"
					>
						+ Add New Blog
					</button>
				</div>
			</div>

			{/* Filter Buttons */}
			<div className="flex flex-wrap gap-2">
				<button
					onClick={() => {
						setFilter('all')
						loadBlogs()
					}}
					className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
						filter === 'all' 
							? 'bg-blue-500 text-white' 
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
				>
					All Blogs
				</button>
				<button
					onClick={() => {
						setFilter('published')
						loadPublishedBlogs()
					}}
					className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
						filter === 'published' 
							? 'bg-green-500 text-white' 
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
				>
					Published
				</button>
				<button
					onClick={() => {
						setFilter('draft')
						loadDraftBlogs()
					}}
					className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
						filter === 'draft' 
							? 'bg-yellow-500 text-white' 
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
				>
					Drafts
				</button>
			</div>


			{/* Blogs List - Simple Card Layout */}
			<div className="space-y-4">
				{loading ? (
					<div className="text-center py-8 text-gray-500">
						Loading blogs...
					</div>
				) : filteredBlogs.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						No blogs found.
					</div>
				) : (
					filteredBlogs.map((blog) => (
						<div key={blog._id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleEdit(blog)}>
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<div className="flex items-center space-x-3 sm:space-x-4">
									{blog.image ? (
										<img
											className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg object-cover"
											src={blog.image}
											alt={blog.title}
											onLoad={() => console.log('Admin table image loaded:', blog.image)}
											onError={(e) => {
												console.log('Admin table image failed:', blog.image)
												e.target.src = 'https://picsum.photos/64/64?random=' + Math.floor(Math.random() * 1000)
											}}
										/>
									) : (
										<img
											className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg object-cover"
											src={`https://picsum.photos/64/64?random=${Math.floor(Math.random() * 1000)}`}
											alt="Random Image"
										/>
									)}
									<div>
										<h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
											{blog.title || 'Untitled Blog'}
										</h3>
										<p className="text-xs sm:text-sm text-gray-500">
											{new Date(blog.createdAt || blog.created_at || new Date()).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:space-x-4">
									<span className={`inline-flex px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
										blog.status === 'published' 
											? 'bg-green-100 text-green-800'
											: 'bg-yellow-100 text-yellow-800'
									}`}>
										{blog.status}
									</span>
									<div className="flex flex-wrap gap-1 sm:gap-2 sm:space-x-2">
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleViewDetails(blog)
											}}
											className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-medium transition-colors flex items-center space-x-1"
										>
											<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
											<span className="hidden sm:inline">View Details</span>
											<span className="sm:hidden">View</span>
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleEdit(blog)
											}}
											className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-medium transition-colors flex items-center space-x-1"
										>
											<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											<span>Edit</span>
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleDelete(blog._id)
											}}
											className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-medium transition-colors flex items-center space-x-1"
										>
											<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											<span>Delete</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								{editingBlog ? 'Edit Blog' : 'Add New Blog'}
							</h2>
							
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Title
									</label>
									<input
										type="text"
										value={formData.title}
										onChange={(e) => setFormData({...formData, title: e.target.value})}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
										placeholder="Enter blog title"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Excerpt
									</label>
									<textarea
										value={formData.excerpt}
										onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
										required
										rows="3"
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
										placeholder="Enter blog excerpt"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Content
									</label>
									<textarea
										value={formData.content}
										onChange={(e) => {
											const newContent = e.target.value
											console.log('📖 CONTENT SIZE UPDATE:')
											console.log('📄 Content length:', newContent.length, 'characters')
											console.log('📄 Content size:', (newContent.length / 1024).toFixed(2), 'KB')
											console.log('📄 Content size:', (newContent.length / (1024 * 1024)).toFixed(2), 'MB')
											setFormData({...formData, content: newContent})
										}}
										required
										rows="6"
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
										placeholder="Enter blog content"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Blog Image
									</label>
									
									{/* File Upload Option */}
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Upload Image File
										</label>
										<input
											type="file"
											accept="image/*"
											onChange={handleFileChange}
											className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand file:text-white hover:file:bg-brand/90"
										/>
										<p className="text-xs text-gray-500 mt-1">
											Maximum file size: 50MB (for file upload). Use image URL for larger files.
										</p>
										{selectedFile && (
											<div className="mt-2">
												<p className="text-xs text-green-600">
													Selected: {selectedFile.name}
												</p>
												<p className={`text-xs ${selectedFile.size > 50 * 1024 * 1024 ? 'text-red-600' : 'text-gray-600'}`}>
													Size: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
													{selectedFile.size > 50 * 1024 * 1024 && ' (Too large! Please use URL instead)'}
												</p>
											</div>
										)}
									</div>

									{/* OR Divider */}
									<div className="flex items-center mb-4">
										<div className="flex-1 border-t border-gray-300"></div>
										<span className="px-3 text-sm text-gray-500">OR</span>
										<div className="flex-1 border-t border-gray-300"></div>
									</div>

									{/* URL Input Option */}
									<div>
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Image URL
										</label>
										<input
											type="url"
											value={formData.image}
											onChange={handleImageUrlChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
											placeholder="Enter image URL (e.g., https://images.unsplash.com/photo-...)"
										/>
										<p className="text-xs text-gray-500 mt-1">
											Try these working sample URLs: 
											<br />• https://picsum.photos/400/300 (Random image)
											<br />• https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop
										</p>
									</div>

									{/* Image Preview */}
									{formData.image && (
										<div className="mt-4">
											<label className="block text-sm font-medium text-gray-600 mb-2">
												Image Preview
											</label>
											<div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
												<img 
													src={formData.image} 
													alt="Preview" 
													className="max-w-full h-48 object-cover rounded-lg mx-auto"
													onLoad={() => console.log('Preview image loaded:', formData.image)}
													onError={(e) => {
														console.log('Preview image failed:', formData.image)
														e.target.style.display = 'none'
													}}
												/>
											</div>
										</div>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Status
									</label>
									<select
										value={formData.status}
										onChange={(e) => setFormData({...formData, status: e.target.value})}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
									>
										<option value="draft">Draft</option>
										<option value="published">Published</option>
									</select>
								</div>

								<div className="flex justify-end space-x-3 pt-4">
									<button
										type="button"
										onClick={() => setShowModal(false)}
										className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={saving}
										className={`px-6 py-2 rounded-lg transition-colors ${
											saving 
												? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
												: 'bg-brand text-white hover:bg-brand/90'
										}`}
									>
										{saving ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{/* Blog Detail Modal */}
			{showDetailModal && viewingBlog && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							{/* Modal Header */}
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">Blog Details</h2>
								<button
									onClick={() => setShowDetailModal(false)}
									className="text-gray-400 hover:text-gray-600 transition-colors"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* Blog Content */}
							<div className="space-y-6">
								{/* Blog Image */}
								{viewingBlog.image && (
									<div className="rounded-2xl overflow-hidden">
										<img
											src={viewingBlog.image}
											alt={viewingBlog.title}
											className="w-full h-64 md:h-80 object-cover"
											onError={(e) => {
												e.target.src = 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 1000)
											}}
										/>
									</div>
								)}

								{/* Blog Info Grid */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Basic Info */}
									<div className="bg-gray-50 rounded-2xl p-6">
										<h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
										<div className="space-y-3">
											<div>
												<label className="text-sm font-medium text-gray-500">Title</label>
												<p className="text-gray-900 font-medium">{viewingBlog.title || 'Untitled Blog'}</p>
											</div>
											<div>
												<label className="text-sm font-medium text-gray-500">Status</label>
												<div className="mt-1">
													<span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
														viewingBlog.status === 'published' 
															? 'bg-green-100 text-green-800'
															: 'bg-yellow-100 text-yellow-800'
													}`}>
														{viewingBlog.status}
													</span>
												</div>
											</div>
											<div>
												<label className="text-sm font-medium text-gray-500">Views</label>
												<p className="text-gray-900">{viewingBlog.views || 0}</p>
											</div>
											<div>
												<label className="text-sm font-medium text-gray-500">Author</label>
												<p className="text-gray-900">{viewingBlog.author?.username || 'Admin'}</p>
											</div>
										</div>
									</div>

									{/* Date Info */}
									<div className="bg-gray-50 rounded-2xl p-6">
										<h3 className="text-lg font-bold text-gray-900 mb-4">Date Information</h3>
										<div className="space-y-3">
											<div>
												<label className="text-sm font-medium text-gray-500">Created</label>
												<p className="text-gray-900">
													{new Date(viewingBlog.createdAt || viewingBlog.created_at || new Date()).toLocaleString()}
												</p>
											</div>
											<div>
												<label className="text-sm font-medium text-gray-500">Updated</label>
												<p className="text-gray-900">
													{new Date(viewingBlog.updatedAt || viewingBlog.updated_at || viewingBlog.createdAt || viewingBlog.created_at || new Date()).toLocaleString()}
												</p>
											</div>
											<div>
												<label className="text-sm font-medium text-gray-500">Blog ID</label>
												<p className="text-gray-900 text-xs font-mono break-all">{viewingBlog._id}</p>
											</div>
										</div>
									</div>
								</div>

								{/* Excerpt */}
								{viewingBlog.excerpt && (
									<div className="bg-blue-50 rounded-2xl p-6">
										<h3 className="text-lg font-bold text-gray-900 mb-3">Excerpt</h3>
										<p className="text-gray-700 leading-relaxed">{viewingBlog.excerpt}</p>
									</div>
								)}

								{/* Content */}
								<div className="bg-gray-50 rounded-2xl p-6">
									<h3 className="text-lg font-bold text-gray-900 mb-4">Content</h3>
									<div 
										className="prose max-w-none text-gray-700 leading-relaxed"
										dangerouslySetInnerHTML={{ 
											__html: viewingBlog.content || 'No content available.' 
										}}
									/>
								</div>

							</div>

							{/* Modal Footer */}
							<div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-8 pt-6 border-t border-gray-200">
								<button
									onClick={() => setShowDetailModal(false)}
									className="px-4 sm:px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
								>
									Close
								</button>
								<button
									onClick={() => {
										setShowDetailModal(false)
										handleEdit(viewingBlog)
									}}
									className="px-4 sm:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
								>
									Edit Blog
								</button>
								<button
									onClick={() => {
										setShowDetailModal(false)
										window.open(`/blog/${viewingBlog._id}`, '_blank')
									}}
									className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
								>
									View Public Page
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BlogManagement
