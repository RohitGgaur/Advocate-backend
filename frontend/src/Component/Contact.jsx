import { useState } from 'react';
import api from '../services/api';

function Contact() {
	// Contact form state
	const [contactForm, setContactForm] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: ''
	});

	// Loading states
	const [isContactSubmitting, setIsContactSubmitting] = useState(false);

	// Success/Error messages
	const [contactMessage, setContactMessage] = useState('');

	// Handle contact form input changes
	const handleContactInputChange = (e) => {
		const { name, value } = e.target;
		setContactForm(prev => ({
			...prev,
			[name]: value
		}));
	};


	// Handle contact form submission
	const handleContactSubmit = async (e) => {
		e.preventDefault();
		setIsContactSubmitting(true);
		setContactMessage('');

		try {
			// Validate required fields
			if (!contactForm.name || !contactForm.email || !contactForm.phone || !contactForm.subject || !contactForm.message) {
				setContactMessage('Please fill in all required fields.');
				return;
			}

			// Validate email format
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(contactForm.email)) {
				setContactMessage('Please enter a valid email address.');
				return;
			}

			console.log('Submitting contact form with data:', contactForm);
			const response = await api.submitContactForm(contactForm);
			console.log('Contact form response:', response);
			
			if (response.success) {
				setContactMessage('Message sent successfully! We will get back to you soon.');
				// Reset form
				setContactForm({
					name: '',
					email: '',
					phone: '',
					subject: '',
					message: ''
				});
			} else {
				setContactMessage(`Failed to send message: ${response.message || 'Unknown error'}`);
			}
		} catch (error) {
			console.error('Contact form error:', error);
			setContactMessage(`Failed to send message: ${error.message}`);
		} finally {
			setIsContactSubmitting(false);
		}
	};


	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-zinc-100 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0" style={{
					backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 2px, transparent 2px),
									radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 2px, transparent 2px)`,
					backgroundSize: '60px 60px, 80px 80px',
					backgroundPosition: '0 0, 40px 40px'
				}}></div>
			</div>

			{/* Floating Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl animate-float"></div>
				<div className="absolute top-40 right-32 w-40 h-40 bg-gradient-to-r from-cyan-200/15 to-emerald-200/15 rounded-full blur-2xl animate-float-reverse delay-1000"></div>
				<div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-r from-rose-200/10 to-amber-200/10 rounded-full blur-2xl animate-glow delay-2000"></div>
			</div>

			<section className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 md:py-16">
				{/* Main Heading */}
				<div className="text-center mb-8 md:mb-16">
					<h1 className="text-2xl sm:text-6xl font-bold text-gray-900 mb-3 md:mb-6 relative">
						Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Us</span>
					</h1>
					<p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 md:mb-8">
						Get in touch with our legal experts for professional consultation
					</p>
					<div className="w-16 md:w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>

				<div className="grid lg:grid-cols-2 gap-4 md:gap-8">
					{/* Contact Information */}
					<div className="space-y-4 md:space-y-6">
						<div className="text-center lg:text-left">
							<h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Get in Touch</h2>
							<p className="text-sm md:text-base text-gray-600">We're here to help with your legal needs</p>
						</div>
						
						{/* Address Cards - Compact Grid */}
						<div className="grid grid-cols-1 gap-2 md:gap-4 mb-4 md:mb-6">
							{/* Greater Noida West Office */}
							<div className="group bg-white rounded-lg shadow-lg p-2 md:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
								<div className="flex items-center space-x-2 md:space-x-3">
									<div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
										<svg className="w-4 h-4 md:w-5 md:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">
											Greater Noida West
										</h3>
										<p className="text-gray-600 text-xs leading-tight">
											Office No.1002, 10th Floor, Galaxy Diamond Plaza, Greater Noida West, Gautam Buddha Nagar-201016
										</p>
									</div>
								</div>
							</div>

							{/* Indirapuram Office */}
							<div className="group bg-white rounded-lg shadow-lg p-2 md:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
								<div className="flex items-center space-x-2 md:space-x-3">
									<div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
										<svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
											Indirapuram
										</h3>
										<p className="text-gray-600 text-xs leading-tight">
											Chamber Address, Indirapuram, Ghaziabad
										</p>
									</div>
								</div>
							</div>

							{/* Delhi Office */}
							<div className="group bg-white rounded-lg shadow-lg p-2 md:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
								<div className="flex items-center space-x-2 md:space-x-3">
									<div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
										<svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
											Delhi
										</h3>
										<p className="text-gray-600 text-xs leading-tight">
											Chamber No. 312, MC Setalvad Lawyers Chambers, India Gate, New Delhi -110001
										</p>
									</div>
								</div>
							</div>

							{/* Residential Office */}
							<div className="group bg-white rounded-lg shadow-lg p-2 md:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
								<div className="flex items-center space-x-2 md:space-x-3">
									<div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
										<svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">
											Residential Office
										</h3>
										<p className="text-gray-600 text-xs leading-tight">
											B-805, Arihant Arden, Greater Noida West, Bisrakh, Gautam Buddha Nagar-201306
										</p>
									</div>
								</div>
							</div>

						</div>

						{/* Contact Details - Compact Grid */}
						<div className="grid grid-cols-1 gap-4">
							{/* Phone Numbers */}
							<div className="group bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
										<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
											Phone Numbers
										</h3>
										<div className="space-y-1">
											<a href="tel:+917065767555" className="block text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm">
												+91-7065767555
											</a>
											<a href="tel:+917065373327" className="block text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm">
												+91-7065373327
											</a>
										</div>
									</div>
								</div>
							</div>

							{/* Email Addresses */}
							<div className="group bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
										<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
											Email Addresses
										</h3>
										<div className="space-y-1">
											<a href="mailto:judicioworks@gmail.com" className="block text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm break-all">
												judicioworks@gmail.com
											</a>
											<a href="mailto:advocate.rishabhmalhotra5@gmail.com" className="block text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm break-all">
												advocate.rishabhmalhotra5@gmail.com
											</a>
										</div>
									</div>
								</div>
							</div>

							{/* Office Hours */}
							<div className="group bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
										<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
											Office Hours
										</h3>
										<div className="space-y-1">
											<div className="flex justify-between items-center text-sm">
												<span className="text-gray-700">Mon-Sat:</span>
												<span className="text-gray-900 font-semibold">9:00 AM - 9:00 PM</span>
											</div>
											<div className="flex justify-between items-center text-sm">
												<span className="text-gray-700">Sunday:</span>
												<span className="text-gray-900 font-semibold">12:00 PM - 5:00 PM</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-white rounded-lg shadow-xl p-4 md:p-8 pb-8 md:pb-12 border border-gray-200 relative overflow-hidden">
						{/* Form Header */}
						<div className="text-center mb-4 md:mb-8">
							<div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4">
								<svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
								</svg>
							</div>
							<h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Send us a Message</h3>
							<p className="text-sm md:text-base text-gray-600">We'll get back to you within 24 hours</p>
						</div>

						<form className="space-y-4 md:space-y-6" onSubmit={handleContactSubmit}>
							{/* Success/Error Message */}
							{contactMessage && (
								<div className={`p-3 md:p-4 rounded-xl text-sm md:text-base ${contactMessage.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
									{contactMessage}
								</div>
							)}

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
								<div className="group">
									<label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
										<svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										Full Name *
									</label>
									<input 
										type="text" 
										name="name"
										value={contactForm.name}
										onChange={handleContactInputChange}
										className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300 text-sm md:text-base" 
										placeholder="Enter your full name" 
										required
									/>
								</div>
								<div className="group">
									<label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
										<svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
										Email Address *
									</label>
									<input 
										type="email" 
										name="email"
										value={contactForm.email}
										onChange={handleContactInputChange}
										className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300 text-sm md:text-base" 
										placeholder="Enter your email" 
										required
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
								<div className="group">
									<label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
										<svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
										Phone Number *
									</label>
									<input 
										type="tel" 
										name="phone"
										value={contactForm.phone}
										onChange={handleContactInputChange}
										className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300 text-sm md:text-base" 
										placeholder="Enter your phone number" 
										required
									/>
								</div>
								<div className="group">
									<label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
										<svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
										</svg>
										Subject *
									</label>
									<input 
										type="text" 
										name="subject"
										value={contactForm.subject}
										onChange={handleContactInputChange}
										className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300 text-sm md:text-base" 
										placeholder="What is this regarding?" 
										required
									/>
								</div>
							</div>
							<div className="group">
								<label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
									<svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
									Message *
								</label>
								<textarea 
									rows="6" 
									name="message"
									value={contactForm.message}
									onChange={handleContactInputChange}
									className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300 resize-none text-sm md:text-base" 
									placeholder="Tell us about your legal matter..."
									required
								></textarea>
							</div>
							<button 
								type="submit" 
								disabled={isContactSubmitting}
								className={`group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm md:text-base ${isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
							>
								{isContactSubmitting ? (
									<>
										<svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
										</svg>
										<span>Sending...</span>
									</>
								) : (
									<>
										<svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
										</svg>
										<span>Send Message</span>
									</>
								)}
							</button>
						</form>
					</div>

			</div>

		</section>
		</div>
	)
}

export default Contact