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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 blog-print-container w-full overflow-x-hidden">
			{/* Hero Section with Image */}
			<div className="relative">
				{/* Background Image */}
				{blog.image && (
					<div className="relative h-96 md:h-[500px] overflow-hidden w-full">
						<img
							src={blog.image}
							alt={blog.title}
							className="w-full h-full object-cover min-w-full"
							onError={(e) => {
								e.target.src = 'https://picsum.photos/1200/600?random=' + Math.floor(Math.random() * 1000)
							}}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
					</div>
				)}
				
				{/* Content Overlay */}
				<div className="absolute inset-0 flex items-end">
					<div className="w-full px-1 sm:max-w-7xl sm:mx-auto sm:px-6 lg:px-8 pb-6 sm:pb-12">
						{/* Back Button */}
						<button 
							onClick={goBack}
							className="mb-4 sm:mb-6 inline-flex items-center text-white hover:text-blue-300 transition-all duration-300 group hover:bg-white/10 px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg backdrop-blur-sm text-sm sm:text-base"
						>
							<svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to Blog
						</button>

						{/* Blog Meta */}
						<div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-white/90 mb-4 sm:mb-6">
							<div className="flex items-center space-x-2 sm:space-x-4">
								<span className="flex items-center space-x-1 sm:space-x-2 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
									<svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									<span>{formatDate(blog.createdAt || blog.created_at || new Date())}</span>
								</span>
								<span className="flex items-center space-x-1 sm:space-x-2 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
									<svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									<span>By {blog.author?.username || 'Admin'}</span>
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<span className="px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg">
									{blog.category || 'General'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

          {/* Title Section */}
          <div className="w-full px-1 sm:max-w-7xl sm:mx-auto sm:px-6 lg:px-8 py-8 print-break-inside-avoid">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight text-center blog-print-title">
              {blog.title || 'Untitled Blog'}
            </h1>
          </div>

			{/* Main Content */}
			<div className="w-full px-1 sm:max-w-7xl sm:mx-auto sm:px-6 lg:px-8 py-8">
				<div className="grid lg:grid-cols-3 gap-16">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Blog Excerpt */}
						{blog.excerpt && (
							<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-10 border-l-4 sm:border-l-6 border-blue-500 mb-6 sm:mb-10 shadow-lg sm:shadow-xl">
								<div className="flex items-start space-x-3 sm:space-x-4">
									<div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
										<svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<div>
										<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Summary</h3>
										<p className="text-gray-700 leading-relaxed text-sm sm:text-lg text-justify">
											{blog.excerpt}
										</p>
									</div>
								</div>
							</div>
						)}

                {/* Blog Content */}
                <div className="prose prose-sm sm:prose-lg max-w-none print-break-inside-avoid">
                  <div
                    className="text-gray-700 leading-relaxed space-y-4 sm:space-y-8 text-sm sm:text-lg bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-lg sm:shadow-xl blog-print-content text-justify"
                    dangerouslySetInnerHTML={{
                      __html: blog.content || 'No content available.'
                    }}
                  />
                </div>

						{/* Blog Tags */}
						{blog.tags && blog.tags.length > 0 && (
							<div className="mt-6 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-lg sm:shadow-xl">
								<h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-8 flex items-center">
									<svg className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
									</svg>
									Tags
								</h3>
								<div className="flex flex-wrap gap-2 sm:gap-4">
									{blog.tags.map((tag, index) => (
										<span 
											key={index}
											className="px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-500 hover:text-white rounded-full text-sm sm:text-base font-medium text-gray-700 transition-all duration-300 cursor-pointer hover:scale-105 sm:hover:scale-110 hover:shadow-lg transform"
										>
											#{tag}
										</span>
									))}
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-6">
							<button 
								onClick={goBack}
								className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center shadow-lg group text-sm sm:text-lg"
							>
								<svg className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
								Back to Blog
							</button>
							<button 
								onClick={() => window.print()}
								className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center border-2 border-gray-200 hover:border-blue-400 group text-sm sm:text-lg"
							>
								<svg className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
								</svg>
								Print Article
							</button>
						</div>
					</div>

              {/* Sidebar */}
              <div className="lg:col-span-1 no-print">
						<div className="sticky top-8 space-y-4 sm:space-y-8">
							{/* Author Card */}
							<div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg sm:shadow-xl">
								<div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
									<div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
										<span className="text-white font-bold text-lg sm:text-2xl">
											{(blog.author?.username || 'Admin').charAt(0).toUpperCase()}
										</span>
									</div>
									<div>
										<h4 className="font-bold text-gray-900 text-base sm:text-lg">{blog.author?.username || 'Admin'}</h4>
										<p className="text-xs sm:text-sm text-gray-600 font-medium">Legal Expert</p>
									</div>
								</div>
								<p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
									Experienced legal professional with expertise in various areas of law, 
									dedicated to providing quality legal insights and guidance.
								</p>
							</div>

							{/* Share Card */}
							<div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg sm:shadow-xl">
								<h4 className="font-bold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-lg">Share this article</h4>
								<div className="flex space-x-2 sm:space-x-4">
									<button className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
										<svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
										</svg>
									</button>
									<a href="https://www.facebook.com/people/Judicioworks-Advocates-And-Associates/61580457930212/?rdid=prvW1VFuVFCvMmCa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F173DVDUoYn%2F" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
										<svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
										</svg>
									</a>
									<button className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
										<svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
										</svg>
									</button>
								</div>
							</div>

							{/* Related Articles */}
							<div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg sm:shadow-xl">
								<h4 className="font-bold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-lg">Related Articles</h4>
								<div className="space-y-4 sm:space-y-6">
									<div className="flex space-x-3 sm:space-x-4">
										<div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">Legal Updates in 2024</h5>
											<p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Recent changes in law</p>
										</div>
									</div>
									<div className="flex space-x-3 sm:space-x-4">
										<div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">Understanding Legal Rights</h5>
											<p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Know your rights</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogDetail
