import { Link } from 'react-router-dom'

function Services() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			{/* Hero Section */}
			<section className="relative py-8 md:py-12 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
					<div className="absolute top-20 right-20 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
					<div className="absolute bottom-10 left-1/4 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
					<div className="absolute bottom-20 right-10 w-36 h-36 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
				</div>
				
				{/* Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						{/* Badge */}
						<div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
							<svg className="w-4 h-4 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span className="text-white/90 text-sm font-medium">Professional Legal Services</span>
						</div>
						
						{/* Main Heading */}
						<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
							<span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
								Our Legal Services
							</span>
						</h1>
						
						{/* Subtitle */}
						<p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
							(Comprehensive legal solutions tailored to meet the diverse needs of our clients across Delhi-NCR)
						</p>
						
					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link
							to="/contact"
							className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25 min-w-[220px]"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
							<svg className="w-5 h-5 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
							<span className="relative z-10">Get Legal Consultation</span>
						</Link>
						
						<Link
							to="/team"
							className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 hover:border-white/50 min-w-[220px]"
						>
							<svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span>Learn About Our Team</span>
						</Link>
					</div>
					
					{/* Social Media Links */}
					<div className="flex justify-center items-center gap-4 mt-8">
						<a 
							href="https://www.linkedin.com/company/judicioworks-advocates-and-associates/" 
							target="_blank" 
							rel="noopener noreferrer" 
							className="text-white/80 hover:text-white transition-colors duration-300"
							aria-label="LinkedIn"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
						</a>
						<a 
							href="https://www.instagram.com/judicioworks?igsh=M3d2N3JnMnU5YjA2" 
							target="_blank" 
							rel="noopener noreferrer" 
							className="text-white/80 hover:text-white transition-colors duration-300"
							aria-label="Instagram"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
						<a 
							href="https://wa.me/917065767555" 
							target="_blank" 
							rel="noopener noreferrer" 
							className="text-white/80 hover:text-white transition-colors duration-300"
							aria-label="WhatsApp"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
							</svg>
						</a>
					</div>
						
						{/* Stats or Features */}
						<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
							<div className="text-center">
								<div className="text-2xl md:text-3xl font-bold text-white mb-2">12+</div>
								<div className="text-white/70 text-sm">Practice Areas</div>
							</div>
							<div className="text-center">
								<div className="text-2xl md:text-3xl font-bold text-white mb-2">100+</div>
								<div className="text-white/70 text-sm">Happy Clients</div>
							</div>
							<div className="text-center">
								<div className="text-2xl md:text-3xl font-bold text-white mb-2">5+</div>
								<div className="text-white/70 text-sm">Years Experience</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
				{/* Introduction */}
				<div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-16 border border-blue-100">
					<div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl sm:rounded-t-3xl"></div>
					<div className="text-center mb-6 sm:mb-8">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 sm:mb-6">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
							Judicioworks Advocates & Associates
						</h2>
						<p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 font-semibold mb-4 sm:mb-6">
							(The Group Of Advocates You Need)
						</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-100">
						<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-justify">
							Judicioworks Advocates & Associates is a leading law firm founded by Rishabh Malhotra (Advocate), with its presence in Ghaziabad, Noida and Delhi. The firm primarily practices before the District Courts of Ghaziabad and District Court of Gautam Buddha Nagar also known as Surajpur District Court and caters to the legal needs of individuals, families, societies and businesses across Noida, Noida Extension, Greater Noida, Greater Noida West, Indirapuram, Vaishali, Vasundhara and other adjoining areas.
						</p>
					</div>
				</div>

				{/* Core Services */}
				<div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-16 border border-slate-200">
					<div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl sm:rounded-t-3xl"></div>
					<div className="text-center mb-6 sm:mb-10">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-4 sm:mb-6">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
							Core Services
						</h2>
						<p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
							(Comprehensive legal services covering all major practice areas)
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
						{[
							{ icon: "💔", title: "Divorce & Family Law", services: "Divorce lawyer - Mutual divorce lawyer - Contested divorce lawyer" },
							{ icon: "👨‍👩‍👧‍👦", title: "Family & Matrimonial", services: "Family lawyer - Matrimonial lawyer - Child custody lawyer" },
							{ icon: "📋", title: "Registration Services", services: "Maintenance lawyer - Marriage registration lawyer - Will registration lawyer" },
							{ icon: "🏠", title: "Property & Civil Law", services: "Legal heir certificate lawyer - Property lawyer - Civil lawyer" },
							{ icon: "⚖️", title: "Criminal Defense", services: "Criminal lawyer - Bail lawyer - NDPS case lawyer" },
							{ icon: "🛡️", title: "Protection Laws", services: "498A lawyer - Dowry case lawyer - Domestic violence lawyer" },
							{ icon: "🏢", title: "Real Estate & RERA", services: "Defamation lawyer - RERA lawyer - Builder-buyer dispute lawyer" },
							{ icon: "💰", title: "Financial Recovery", services: "Consumer lawyer - Cheque bounce lawyer - Recovery lawyer" },
							{ icon: "💼", title: "Commercial & Labour", services: "Commercial litigation lawyer - Labour lawyer - Employment dispute lawyer" },
							{ icon: "🤝", title: "Dispute Resolution", services: "Arbitration lawyer - Mediation lawyer - Conciliation lawyer" },
							{ icon: "📜", title: "High Court Matters", services: "Writ petition lawyer - SLP lawyer - Transfer petition lawyer" },
							{ icon: "📄", title: "Estate Planning", services: "Probate lawyer" }
						].map((service, index) => (
							<div key={index} className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100">
								<div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">{service.icon}</div>
								<h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
									{service.title}
								</h3>
								<p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
									{service.services}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Practice Areas */}
				<div className="relative bg-gradient-to-br from-white to-purple-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-16 border border-purple-100 mt-8 sm:mt-0">
					<div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl sm:rounded-t-3xl"></div>
					<div className="text-center mb-6 sm:mb-10">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 sm:mb-6">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
							Practice Areas
						</h2>
						<p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
							(Specialized legal expertise across diverse practice areas)
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
						{[
							{
								icon: "👨‍👩‍👧‍👦",
								title: "Family Law & Matrimonial Law",
								content: "Marriage disputes, annulments, judicial separation. Handling sensitive family disputes across Noida, Ghaziabad, Indirapuram and Greater Noida West."
							},
							{
								icon: "💔",
								title: "Divorce Law",
								content: "Mutual consent divorce and contested divorce. Representation before Ghaziabad and Surajpur district courts."
							},
							{
								icon: "👶",
								title: "Child Custody & Maintenance",
								content: "Custody, guardianship and visitation rights. Maintenance claims under relevant laws."
							},
							{
								icon: "📋",
								title: "Marriage & Will Registration",
								content: "Registration of marriages in Tehsil Ghaziabad, Dadri and Noida. Registration of Wills and obtaining Probate. Legal Heir Certificates for succession of property and bank accounts."
							},
							{
								icon: "🏠",
								title: "Property & Conveyancing",
								content: "Transfer Memorandum of residential and commercial units. Registration of Sale Deeds, Lease Deeds, Sub-Lease Deeds and conveyancing matters in Surajpur, Ghaziabad and Noida."
							},
							{
								icon: "⚖️",
								title: "Criminal Law",
								content: "FIR registration, bail, criminal trial. Cases under NDPS, 498A, dowry harassment, dowry death, domestic violence, defamation and economic offences (including CBI)."
							},
							{
								icon: "💼",
								title: "Labour & Employment Law",
								content: "Industrial disputes, unlawful termination, employee-management disputes. Representation in employment-related litigation for workers and companies."
							},
							{
								icon: "🏢",
								title: "Consumer & RERA Disputes",
								content: "Builder-buyer disputes: delay in possession, demand of IFMS, sinking fund disputes, unfair builder-buyer agreements. RERA complaints, AOA registration and election disputes."
							},
							{
								icon: "💰",
								title: "Cheque Bounce & Recovery",
								content: "Litigation under NI Act for cheque bounce. Recovery proceedings before Commercial Courts in Ghaziabad and Gautam Buddha Nagar."
							},
							{
								icon: "🤝",
								title: "Alternate Dispute Resolution",
								content: "Arbitration, mediation, conciliation proceedings. Cost-effective and time-efficient dispute resolution."
							},
							{
								icon: "📜",
								title: "Writs, SLPs & Transfer Petitions",
								content: "Filing writs before High Courts and Special Leave Petitions before Supreme Court. Transfer petitions for matrimonial and civil matters."
							},
							{
								icon: "📄",
								title: "Civil Law & Property Disputes",
								content: "Civil suits relating to property, contracts, and injunctions. Probate of wills and succession disputes."
							}
						].map((area, index) => (
							<div key={index} className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
								<div className="flex items-start space-x-3 sm:space-x-4">
									<div className="text-xl sm:text-2xl lg:text-3xl">{area.icon}</div>
									<div className="flex-1">
										<h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
											{area.title}
										</h3>
										<p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
											{area.content}
										</p>
									</div>
								</div>
					</div>
				))}
			</div>
				</div>

				{/* Legal Services for Residents */}
				<div className="relative bg-gradient-to-br from-white to-green-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-16 border border-green-100">
					<div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl sm:rounded-t-3xl"></div>
					<div className="text-center mb-6 sm:mb-10">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 sm:mb-6">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
							Legal Services for Residents
						</h2>
						<p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
							(Specialized legal services for residents of Noida, Greater Noida West and Ghaziabad)
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
						{[
							{
								title: "Family & Matrimonial Lawyers in Noida, Greater Noida & Ghaziabad",
								description: "Advocates for marriage disputes, separation, annulment & related family law matters in Noida, Greater Noida West, Ghaziabad & Indirapuram."
							},
							{
								title: "Divorce Lawyer in Noida Extension | Mutual & Contested Divorce",
								description: "Experienced divorce advocates for mutual consent & contested divorce cases in Greater Noida West, Surajpur, Ghaziabad & Indirapuram societies."
							},
							{
								title: "Child Custody & Maintenance Lawyers in Noida & Ghaziabad",
								description: "Legal support for custody, visitation & maintenance matters in family disputes across Noida Extension, Greater Noida West & Ghaziabad."
							},
							{
								title: "Marriage Registration & Will Lawyers in Noida & Ghaziabad",
								description: "Assistance with marriage registration, legal heir certificate & will drafting in Tehsil Ghaziabad, Dadri, Noida, Indirapuram & Greater Noida West."
							},
							{
								title: "Property Registration & Conveyancing Lawyers in Greater Noida",
								description: "Sale deed, lease deed, transfer memorandum & property registration in Surajpur, Bisrakh, Noida Extension, Indirapuram & Ghaziabad."
							},
							{
								title: "Criminal Lawyers in Ghaziabad & Noida | Bail, FIR & Trial",
								description: "Defence in 498A, dowry, NDPS, domestic violence, defamation & bail matters in District Courts Ghaziabad & Gautam Buddha Nagar (Surajpur)."
							},
							{
								title: "Labour Dispute & Employment Lawyers in Noida & Ghaziabad",
								description: "Handling industrial disputes, unlawful termination & contract disputes for employees & management in Noida, Indirapuram & Greater Noida West."
							},
							{
								title: "RERA & Consumer Dispute Lawyers in Greater Noida & Ghaziabad",
								description: "Builder-buyer disputes, possession delay, IFMS recovery, AOA registration & election handled in Noida Extension & Indirapuram societies."
							},
							{
								title: "Cheque Bounce & Recovery Lawyers in Noida & Greater Noida West",
								description: "Commercial litigation for cheque bounce & recovery before commercial courts in Ghaziabad, Surajpur, Noida Extension & Indirapuram."
							},
							{
								title: "Arbitration & Mediation Lawyers in Noida & Ghaziabad",
								description: "Alternate dispute resolution through arbitration, mediation & conciliation in Noida, Greater Noida, Greater Noida West and Ghaziabad."
							},
							{
								title: "Writ & SLP Lawyers in Noida, Ghaziabad & Greater Noida",
								description: "Filing writ petitions, transfer petitions & special leave petitions before High Courts & Supreme Court. Serving Noida Extension, Greater Noida West, Greater Noida, Indirapuram, Vasundhara, Vaishali."
							},
							{
								title: "Civil Lawyers in Noida & Ghaziabad | Property & Probate",
								description: "Advocates for property disputes, will probate & civil litigation in Noida Extension, Greater Noida West, Indirapuram & District Courts."
							}
						].map((service, index) => (
							<div key={index} className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
								<h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-600 transition-colors">
									{service.title}
								</h3>
								<p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
									{service.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Jurisdiction Details */}
				<div className="relative bg-gradient-to-br from-white to-amber-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-16 border border-amber-100">
					<div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-2xl sm:rounded-t-3xl"></div>
					<div className="text-center mb-6 sm:mb-10">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4 sm:mb-6">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
							Jurisdiction Details
						</h2>
						<p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
							(Understanding our court jurisdictions and service areas)
						</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-amber-100">
						<div className="space-y-4 sm:space-y-6">
							<div>
								<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">District Court of Gautam Buddha Nagar (Surajpur)</h3>
								<p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mb-4">
									Noida and Greater Noida West, also known as Noida Extension, are two of the most rapidly growing urban clusters of the National Capital Region (NCR). With over 160 notified sectors in Noida and several high-density residential sectors in Greater Noida West, lakhs of residents today call these areas home.
								</p>
								<p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mb-4">
									What many people are not always aware of is that all disputes, legal matters, and proceedings arising within these areas fall under the jurisdiction of the District Court Gautam Buddha Nagar, popularly referred to as the Surajpur District Court.
								</p>
							</div>
							<div>
								<h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Noida Sectors Coverage</h4>
								<p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mb-4">
									The city of Noida is planned with 163 designated sectors, numbered from 1 to 168, with a few missing numbers such as 13, 103, 109, 111, and 114. These sectors are divided into residential, institutional, industrial and commercial zones. Over the years, certain sectors have emerged as densely populated residential belts such as Sectors 12, 22, 27, 29, 34, 50, 51, 61, 62, 71, 72, 76, 77, 78, 79, 93, 93A, 137, 142, 143, and 150.
								</p>
							</div>
							<div>
								<h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Greater Noida West Coverage</h4>
								<p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mb-4">
									Greater Noida West has its own distinct set of notified sectors such as Sector 1, 2, 3, 4, 5, 6, 10, 12, 16B, 16C, 18, and 19, along with major institutional and commercial zones like Tech Zone IV and Knowledge Parks IV and V. This region is one of the fastest growing residential hubs in Gautam Buddha Nagar, with high-rise group housing societies and large township projects.
								</p>
							</div>
							<div>
								<h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Ghaziabad District Court Jurisdiction</h4>
								<p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
									Ghaziabad, a key urban district adjoining Delhi and Noida, falls under the jurisdiction of the Ghaziabad District Court, with several prominent residential and commercial hubs such as Indirapuram, Vaishali, and Vasundhara forming some of the most densely populated and sought-after areas.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Area Specific Services */}
				<div className="relative bg-gradient-to-br from-white to-indigo-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-16 border border-indigo-100">
					<div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl sm:rounded-t-3xl"></div>
					<div className="text-center mb-6 sm:mb-10">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 sm:mb-6">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
							Area Specific Services
						</h2>
						<p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
							(Comprehensive legal services across all major residential and commercial areas)
						</p>
					</div>
					<div className="space-y-6 sm:space-y-8">
						{[
							{
								title: "Noida Sectors",
								areas: ["Sector 18", "Sector 50", "Sector 51", "Sector 61", "Sector 62", "Sector 71", "Sector 72", "Sector 76", "Sector 77", "Sector 78", "Sector 79", "Sector 93", "Sector 93A", "Sector 137", "Sector 142", "Sector 143", "Sector 150"],
								services: ["Criminal Law", "Divorce Law", "Property Law", "Labour Law", "Cheque Bounce", "Consumer Disputes", "Civil Law"]
							},
							{
								title: "Greater Noida West",
								areas: ["Noida Extension", "Gaur City 1 & 2", "Gaur Yamuna City", "Supertech Eco Village 1 & 2", "ATS Dolce", "ATS Advantage", "Amrapali Dream Valley", "Amrapali Sapphire", "Amrapali Silicon City", "Mahagun Mywoods", "Mahagun Moderne", "Mahagun Maple", "Panchsheel Greens", "Panchsheel Pratishtha", "Panchsheel Iconic", "Orange County", "Angel Mercury", "Angel Jupiter", "Purvanchal Royal City", "Jaypee Greens"],
								services: ["All Legal Services", "Society Disputes", "Builder-Buyer Issues", "AOA Registration", "Commercial Litigation"]
							},
							{
								title: "Indirapuram",
								areas: ["Shipra Suncity", "Gaur Green", "Orange County", "Amrapali", "ATS Advantage", "Niti Khand", "Ahinsa Khand", "Vaibhav Khand", "Nyay Khand"],
								services: ["Family Law", "Property Registration", "Criminal Defense", "Labour Disputes", "Commercial Litigation"]
							},
							{
								title: "Vaishali",
								areas: ["Vaishali Sector 1-6", "Mahagun Apartments", "Cloud 9", "Supertech Residency", "Saya Zenith"],
								services: ["Matrimonial Law", "Property Matters", "Criminal Cases", "Consumer Disputes"]
							},
							{
								title: "Vasundhara",
								areas: ["SG Impressions", "Saya Zenith", "Ashiana Upvan", "Gardenia Gateway", "Gardenia Glamour"],
								services: ["Family Disputes", "Property Registration", "Civil Litigation", "Employment Law"]
							},
							{
								title: "Ghaziabad & Surrounding Areas",
								areas: ["Ghaziabad Courts", "Dadri", "Bisrakh", "Vaidpura", "Haibatpur"],
								services: ["All District Court Matters", "Tehsil Services", "Registration Services", "Legal Heir Certificates"]
							}
						].map((region, index) => (
							<div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border border-gray-100">
								<h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{region.title}</h3>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
									<div>
										<h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Coverage Areas:</h4>
										<div className="flex flex-wrap gap-1 sm:gap-2">
											{region.areas.map((area, areaIndex) => (
												<span key={areaIndex} className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs sm:text-sm rounded-full">
													{area}
												</span>
											))}
										</div>
									</div>
									<div>
										<h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Services Offered:</h4>
										<div className="flex flex-wrap gap-1 sm:gap-2">
											{region.services.map((service, serviceIndex) => (
												<span key={serviceIndex} className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full">
													{service}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Call to Action */}
				<div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
					<div className="absolute inset-0 bg-black/20"></div>
					<div className="absolute top-0 left-0 w-full h-full">
						<div className="absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
						<div className="absolute bottom-10 right-10 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
					</div>
					<div className="relative z-10">
						<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 lg:mb-8">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
							Need Legal Assistance?
						</h2>
						<p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
							Contact our experienced legal team for comprehensive legal solutions tailored to your specific needs. We're here to help you navigate through complex legal matters with confidence.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
							<Link
								to="/contact"
								className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl sm:shadow-2xl text-sm sm:text-base"
							>
								<svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
								</svg>
								Get Free Consultation
							</Link>
							<Link
								to="/team"
								className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 text-sm sm:text-base"
							>
								<svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Learn About Our Team
							</Link>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Services 