import { useParams, Link } from 'react-router-dom'

// Import practice area images with correct paths
import criminalLawImage from '../assets/criminallaw.webp'
import civilLawImage from '../assets/civillaw.webp'
import familyLawImage from '../assets/Familylaw.webp'
import realEstateLawImage from '../assets/realstatelaw.webp'
import complianceImage from '../assets/complience.webp'
import convencingLawImage from '../assets/convencinglaw.webp'
import writLawImage from '../assets/waitlaw.webp'
import commercialLawImage from '../assets/civillaw.webp' // Using civil law image as fallback
import consumerLawImage from '../assets/consumerlaw.jpg'
import laborLawImage from '../assets/labourlaw.jpeg'

// Debug: Log the image paths
console.log('Criminal Law Image:', criminalLawImage);
console.log('Civil Law Image:', civilLawImage);
console.log('Family Law Image:', familyLawImage);
console.log('Real Estate Law Image:', realEstateLawImage);
console.log('Compliance Image:', complianceImage);

function PracticeAreaDetail() {
	const { id } = useParams()

	const practiceAreas = [
		{
			id: 1,
			title: "FAMILY LAW",
			description: "At Judicioworks Advocates and Associates, we recognise the sensitive nature of family and matrimonial law matters and approach each case with both compassion and strategy. Our practice covers a wide range of family-related issues, including divorce, child custody, alimony, adoption, and matters arising from domestic concerns. We place emphasis on the well-being and best interests of our clients and their families, offering thoughtful legal advice, effective negotiation, and representation before the courts when required. We regularly assist clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: familyLawImage,
			services: ["Divorce", "Child Custody", "Alimony", "Adoption", "Domestic Violence"]
		},
		{
			id: 2,
			title: "CRIMINAL LAW",
			description: "Criminal law deals with offences, their prosecution, and the legal consequences that follow. At Judicioworks Advocates and Associates, our criminal law practice extends before the courts of Delhi, Ghaziabad, and Gautam Buddha Nagar. Matters arising from Indirapuram, Vaishali, and Vasundhara fall within the jurisdiction of the Ghaziabad courts, while cases from Noida, Greater Noida, and Greater Noida West are taken up before the courts of Gautam Buddha Nagar. Our advocates handle a broad spectrum of criminal cases, including serious charges such as rape, dowry death, and dowry harassment, as well as matters like traffic challans, narcotics-related offences, assault, theft, white-collar crimes, and juvenile cases. With considerable experience in criminal defence and a deep understanding of substantive and procedural law, we are committed to protecting the rights of individuals accused and ensuring due process at every stage of the proceedings.",
			image: criminalLawImage,
			services: ["Criminal Defense", "Prosecution", "Rights Protection", "Case Handling", "Legal Representation"]
		},
		{
			id: 3,
			title: "CIVIL LAW",
			description: "At Judicioworks Advocates and Associates, our practice in civil law covers a wide spectrum of disputes and legal concerns affecting both individuals and businesses. Civil law matters may include contracts, property disputes, family law, personal injury claims, among others. Our team is dedicated to offering informed guidance and effective representation, ensuring that each matter is approached with due care and attention to its unique circumstances. From resolving contractual issues to addressing family law concerns or pursuing rightful claims, we assist clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: civilLawImage,
			services: ["Contract Disputes", "Property Disputes", "Personal Injury", "Legal Representation", "Dispute Resolution"]
		},
		{
			id: 4,
			title: "REAL ESTATE LAW",
			description: "At Judicioworks Advocates and Associates, our real estate law practice covers matters relating to the Real Estate (Regulation and Development) Act (RERA), property disputes, and consumer protection before consumer courts. We assist clients with a wide range of concerns, including real estate transactions, drafting and reviewing contracts, and addressing disputes through negotiation, mediation, or litigation where required. Our approach is to safeguard the rights and interests of our clients by providing clear, practical, and effective legal guidance. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: realEstateLawImage,
			services: ["RERA Compliance", "Property Transactions", "Property Disputes", "Contract Review", "Dispute Resolution"]
		},
		{
			id: 5,
			title: "COMMERCIAL LITIGATION",
			description: "At Judicioworks Advocates and Associates, our commercial litigation practice addresses a wide range of business disputes, including recovery proceedings, cheque dishonour matters, and arbitration cases. We focus on providing structured and strategic legal solutions that align with the specific requirements of each matter. Our approach is centred on protecting commercial interests through effective representation, negotiation, and, where required, proceedings before the courts or arbitral tribunals. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: commercialLawImage,
			services: ["Recovery Cases", "Cheque Bounce", "Arbitration", "Commercial Disputes", "Strategic Solutions"]
		},
		{
			id: 6,
			title: "CONSUMER PROTECTION LAW",
			description: "At Judicioworks Advocates and Associates, our consumer protection practice is focused on safeguarding the rights of individuals and ensuring fairness in the marketplace. We assist clients with disputes involving defective products, deficient services, and unfair trade practices. Our approach includes providing clear legal guidance, pursuing appropriate remedies, and representing clients before consumer forums and courts where required. By addressing concerns such as faulty goods, misleading advertisements, and service deficiencies, we work to secure just outcomes for consumers. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: consumerLawImage,
			services: ["Consumer Rights", "Product Defects", "Unfair Trade Practices", "Deficient Services", "Legal Advocacy"]
		},
		{
			id: 7,
			title: "CLAIM PETITIONS",
			description: "At Judicioworks Advocates and Associates, we handle a wide spectrum of claim petitions, including railway accident claims and motor accident claims. Our work in this area focuses on ensuring that individuals and families receive just and fair compensation for the losses they have suffered. From gathering relevant evidence to addressing insurance-related concerns and, where necessary, representing clients before the courts, we provide structured legal support throughout the process. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: complianceImage,
			services: ["Railway Claims", "Motor Accident Claims", "Insurance Negotiation", "Evidence Gathering", "Court Representation"]
		},
		{
			id: 8,
			title: "LABOUR AND EMPLOYMENT LAW",
			description: "At Judicioworks Advocates and Associates, our labour and employment law practice is designed to address the concerns of both employers and employees in an evolving workplace environment. We provide guidance on a broad range of matters, including compliance with labour regulations, employment contracts, workplace disputes, wrongful termination, discrimination, and claims relating to wages or benefits. Our approach is to offer practical solutions that safeguard rights and promote fair practices, while ensuring that each matter is handled with due care and attention. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: laborLawImage,
			services: ["Employment Compliance", "Wrongful Termination", "Discrimination", "Unpaid Wages", "Rights Protection"]
		},
		{
			id: 9,
			title: "CONVEYANCING AND COURT MARRIAGES",
			description: "At Judicioworks Advocates and Associates, we provide comprehensive legal services in conveyancing, legal advisory, and marriage registration. Our conveyancing practice assists clients in property transactions, ensuring that documentation, registration, and compliance requirements are handled smoothly and effectively. We also provide tailored legal advice across various areas of law, addressing individual and business needs with clarity and precision. In addition, we facilitate marriage registrations, including court marriages, by assisting clients with the necessary formalities and procedures before the Tehsil Dadri, Tehsil Ghaziabad, Sub-Registrar Office Dadri, Sub-Registrar Office Noida, and Sub-Registrar Office Ghaziabad, ensuring a seamless process in compliance with applicable legal requirements.",
			image: convencingLawImage,
			services: ["Conveyancing", "Property Transactions", "Court Marriages", "Marriage Registration", "Legal Advice"]
		},
		{
			id: 10,
			title: "WRIT AND SPECIAL LEAVE PETITIONS",
			description: "At Judicioworks Advocates and Associates, our practice includes handling Writ Petitions and Special Leave Petitions (SLPs) before constitutional courts. We assist clients in matters involving fundamental rights, administrative actions, and appellate reliefs. Our role encompasses drafting, filing, and presenting petitions with a focus on structured advocacy and clear legal remedies under the constitutional and statutory framework. We regularly represent clients before the Hon'ble High Courts and the Hon'ble Supreme Court of India, ensuring that each matter is pursued with diligence and precision.",
			image: writLawImage,
			services: ["Writ Petitions", "Special Leave Petitions", "Constitutional Reliefs", "High Court", "Supreme Court"]
		}
	]

	const practiceArea = practiceAreas.find(area => area.id === parseInt(id))
	
	// Debug: Log the practice area and its image
	console.log('Practice Area:', practiceArea);
	console.log('Practice Area Image:', practiceArea?.image);

	if (!practiceArea) {
		return (
			<div className="min-h-screen bg-gray-50 py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">Practice Area Not Found</h1>
					<p className="text-gray-600 mb-8">The requested practice area could not be found.</p>
					<Link to="/" className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand/90 transition-colors">
						Back to Home
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 py-16">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav className="mb-8">
					<ol className="flex items-center space-x-2 text-sm text-gray-600">
						<li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
						<li><span className="mx-2">/</span></li>
						<li><Link to="/" className="hover:text-brand transition-colors">Practice Areas</Link></li>
						<li><span className="mx-2">/</span></li>
						<li className="text-gray-800 font-medium">{practiceArea.title}</li>
					</ol>
				</nav>

				{/* Header Section */}
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
					<div className="relative">
						<div 
							className="w-full h-80 bg-cover bg-center bg-no-repeat"
							style={{ backgroundImage: `url(${practiceArea.image})` }}
						>
							<img 
								src={practiceArea.image} 
								alt={practiceArea.title}
								className="w-full h-80 object-cover"
								onLoad={() => console.log('Image loaded successfully:', practiceArea.image)}
								onError={(e) => {
									console.log('Image failed to load:', practiceArea.image);
									console.log('Error details:', e);
									e.target.style.display = 'none';
								}}
							/>
						</div>
						<div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
							<h1 className="text-2xl sm:text-5xl font-bold text-white mb-2 sm:mb-3">{practiceArea.title}</h1>
							<p className="text-white/90 text-sm sm:text-xl">Expert Legal Services</p>
						</div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8">
							<h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Overview</h2>
							<p className="text-gray-700 leading-relaxed text-sm sm:text-lg text-justify">
								{practiceArea.description}
							</p>
						</div>

						<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
							<h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Why Judicioworks Advocates and Associates?</h2>
							<div className="grid md:grid-cols-2 gap-4 sm:gap-6">
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Expertise in Law</h3>
										<p className="text-gray-600 text-xs sm:text-sm text-justify">Our team comprises advocates with substantial experience across diverse areas of practice.</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Individualized Client Support</h3>
										<p className="text-gray-600 text-xs sm:text-sm text-justify">We provide considered guidance and address each matter according to its specific requirements.</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Strategic Representation</h3>
										<p className="text-gray-600 text-xs sm:text-sm text-justify">Legal representation is approached with a focus on thorough preparation and well-structured strategy.</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Regional Court Practice</h3>
										<p className="text-gray-600 text-xs sm:text-sm text-justify">Regular appearance and practice before courts in Delhi, Noida, and Ghaziabad.</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Services */}
						<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Our Services</h3>
							<ul className="space-y-2 sm:space-y-3">
								{practiceArea.services.map((service, index) => (
									<li key={index} className="flex items-center space-x-2 sm:space-x-3">
										<div className="w-2 h-2 bg-brand rounded-full"></div>
										<span className="text-gray-700 text-sm sm:text-base">{service}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Contact CTA */}
						<div className="bg-brand rounded-2xl p-4 sm:p-6 text-white text-center">
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">In Need of Legal Assistance?</h3>
							<p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base text-justify">Schedule a consultation to discuss your matter with an experienced advocate.</p>
							<Link 
								to="/contact" 
								className="inline-block bg-white text-brand px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
							>
								Contact Us
							</Link>
						</div>

						{/* Back to Practice Areas */}
						<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center">
							<Link 
								to="/" 
								className="inline-flex items-center space-x-2 text-brand hover:text-brand/80 transition-colors"
							>
								<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								<span className="text-sm sm:text-base">Back to Practice Areas</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PracticeAreaDetail 