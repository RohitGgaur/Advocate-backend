function About() {
	return (
		<div style={{ backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
		<section className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 md:py-16">
		{/* Main Heading */}
		<div className="text-center mb-4 md:mb-16">
			<h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 md:mb-6 relative">
				About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Us</span>
			</h1>
			<p className="text-sm md:text-xl text-gray-600 max-w-4xl mx-auto mb-2 md:mb-8">
				(Learn more about our legal expertise and commitment to excellence)
			</p>
			<div className="w-16 md:w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
		</div>

		{/* Introduction Section */}
		<div className="bg-white rounded-lg shadow-lg p-2 md:p-8 mb-4 md:mb-12 border-l-4" style={{ borderLeftColor: '#374151' }}>
			<div className="mb-1 md:mb-4">
				<h2 className="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Welcome to Judicioworks Advocates and Associates</h2>
				<p className="text-xs md:text-lg text-gray-600 font-medium">(The Group Of Advocates You Need)</p>
			</div>
			<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
				where legal excellence meets client satisfaction. Our firm is dedicated to providing comprehensive legal solutions tailored to meet the diverse needs of our clients in Delhi-NCR, with a focus on Ghaziabad and Noida.
			</p>
		</div>

		{/* Founder Section */}
		<div className="grid md:grid-cols-2 gap-2 md:gap-8 mb-4 md:mb-12">
			<div className="bg-white rounded-lg shadow-lg p-2 md:p-8 border-l-4" style={{ borderLeftColor: '#374151' }}>
				<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-4">Our Founder</h3>
				<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
					Founded by <span className="font-semibold text-gray-800">Rishabh Malhotra (Advocate)</span>, who is enrolled with the State Bar Council of Delhi and is a member of the Delhi High Court Bar Association, Judicioworks Advocates and Associates (The Group Of Advocates You Need) prides itself on a team of experienced and dedicated attorneys.
				</p>
			</div>
			<div className="bg-white rounded-lg shadow-lg p-2 md:p-8 border-l-4 border-gray-300">
				<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-4">Court Coverage</h3>
				<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
					Our practice extends before the Ld. District Courts of <span className="font-semibold">Ghaziabad, Gautam Buddha Nagar and Delhi</span> as well as before the Hon'ble High Courts of <span className="font-semibold">Delhi and Allahabad</span> and the <span className="font-semibold">Hon'ble Supreme Court of India</span>.
				</p>
			</div>
		</div>

		{/* Practice Areas Section */}
		<div className="bg-white rounded-lg shadow-lg p-3 md:p-8 mb-6 md:mb-12">
			<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-3 md:mb-6">Our Expertise</h3>
			<p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-xs md:text-base text-justify">
				Our expertise spans various practice areas including:
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
				{[
					"Family Law", "Criminal Law", "Civil Law", "Real Estate Law", 
					"Commercial Litigation", "Consumer Protection Law", "Claim Petitions", 
					"Labour and Employment Law", "Conveyancing and Court Marriages", 
					"Writ and Special Leave Petitions"
				].map((area, index) => (
					<div key={index} className="flex items-center space-x-1 md:space-x-2">
						<div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-800 rounded-full"></div>
						<span className="text-gray-800 font-medium text-xs md:text-base">{area}</span>
					</div>
				))}
			</div>
		</div>

		{/* Client Focus Section */}
		<div className="bg-white rounded-lg p-3 md:p-8 mb-6 md:mb-12 shadow-lg border border-gray-200">
			<h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-4 text-gray-900">Client Satisfaction is Our Priority</h3>
			<p className="leading-relaxed text-gray-700 text-xs md:text-base text-justify">
				We strive to provide personalised attention and guidance to each client. Whether you are facing a legal dispute, planning a business transaction, or seeking legal advice, you can trust Judicioworks Advocates and Associates (The Group Of Advocates You Need) to provide sound legal counsel and representation every step of the way.
			</p>
		</div>

		{/* Location & Environment */}
		<div className="grid md:grid-cols-2 gap-3 md:gap-8 mb-6 md:mb-12">
			<div className="bg-white rounded-lg shadow-lg p-3 md:p-8">
				<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Strategic Location</h3>
				<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
					We are located in <span className="font-semibold text-gray-800">UP (Greater Noida West, Indirapuram)</span> and <span className="font-semibold text-gray-800">all over Delhi</span>, having office spaces.
				</p>
			</div>
			<div className="bg-white rounded-lg shadow-lg p-3 md:p-8">
				<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Professional Support</h3>
				<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
					We understand that navigating the legal system can be daunting, which is why we are here to offer guidance and support to our clients throughout the legal process, in the best manner possible.
				</p>
			</div>
		</div>

		{/* Values Section */}
		<div className="bg-white rounded-lg shadow-lg p-3 md:p-8 mb-6 md:mb-12">
			<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Our Commitment</h3>
			<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
				At Judicioworks Advocates and Associates (The Group Of Advocates You Need), we are committed to upholding the highest standards of <span className="font-semibold text-gray-800">integrity, professionalism, and ethical conduct</span>. With a track record of success and a reputation for excellence, you can trust us to protect your legal rights and advocate fiercely on your behalf.
			</p>
		</div>

		{/* Current Engagements */}
		<div className="bg-white rounded-lg shadow-lg p-3 md:p-8 mb-6 md:mb-12">
			<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Current Court Engagements</h3>
			<p className="text-gray-700 leading-relaxed text-xs md:text-base text-justify">
				Currently engaged before the Ld. District Courts of <span className="font-semibold text-gray-800">Ghaziabad (covering areas like Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension)</span>, <span className="font-semibold text-gray-800">Gautam Buddha Nagar (covering areas like Noida, Noida Extension, Greater Noida, Greater Noida West)</span>, and <span className="font-semibold text-gray-800">Delhi</span>, as well as before the Hon'ble High Courts of <span className="font-semibold text-gray-800">Delhi and Allahabad</span> and the <span className="font-semibold text-gray-800">Hon'ble Supreme Court of India</span>.
			</p>
		</div>

		{/* Call to Action */}
		<div className="text-center bg-white rounded-lg shadow-lg p-3 md:p-8">
			<h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Connect With Us</h3>
			<p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-xs md:text-base text-justify">
				At Judicioworks Advocates and Associates, we are available to guide you through your legal concerns with clarity and diligence. You may contact us to schedule a consultation and explore how our team can provide effective legal assistance. Our practice regularly caters to clients from Ghaziabad, including Indirapuram, Vaishali, and Vasundhara, as well as from Gautam Buddha Nagar, covering Noida, Greater Noida, and Greater Noida West.
			</p>
			<a 
				href="https://wa.me/917065767555" 
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center justify-center rounded-md bg-white px-4 md:px-8 py-2 md:py-3 text-black font-medium hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 border border-gray-300 text-sm md:text-base"
			>
				<svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
				</svg>
				WhatsApp Business
			</a>
		</div>
		</section>
		</div>
	)
}

export default About 