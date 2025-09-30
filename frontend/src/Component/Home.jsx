import heroImg from '../assets/mainimage.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import ReviewsSlider from './ReviewsSlider'

// Import all photos from the Adv photos folder
import photo1 from '../assets/Adv photos/0b1aa852-5596-46af-b9bc-7eaf8d344286.jpg'
import photo2 from '../assets/Adv photos/0d321f48-4faa-4453-a6c9-2b65b62ca34f.jpg'
import photo3 from '../assets/Adv photos/0e09e9db-eadc-45f0-b5b8-ba2f2119124a.jpg'
import photo4 from '../assets/Adv photos/0f5ca8a5-cf4a-47c2-b788-f4eca5a4a859.jpg'
import photo5 from '../assets/Adv photos/19a78edd-929d-4383-8dd0-7febab8ed5df.jpg'
import photo6 from '../assets/Adv photos/1e8e9664-4cf5-4b2b-8165-b8514fba6848.jpg'
import photo7 from '../assets/Adv photos/277e71d1-444d-428d-9d3e-5c44258cb78a.jpg'
import photo8 from '../assets/Adv photos/33880aad-b7f8-408b-b487-bbe2fa2d4cc2.jpg'
import photo9 from '../assets/Adv photos/3c861e77-c005-4c02-88f7-660cd8dd863a.jpg'
import photo10 from '../assets/Adv photos/3ec1a0af-3f0d-43bc-8cd7-c688c246fe37.jpg'
import photo11 from '../assets/Adv photos/3ec3ab00-4c9b-4f0e-9100-e9747af3dcbc.jpg'
import photo12 from '../assets/Adv photos/4f591e18-242c-4ffb-86b5-6946b8dca0b2.jpg'
import photo13 from '../assets/Adv photos/77e7eaab-6486-4d19-b24f-8174ef94abf9.jpg'
import photo14 from '../assets/Adv photos/8b4c97b2-b96c-4baf-9dd0-4129a2df06be.jpg'
import photo15 from '../assets/Adv photos/985b2dea-1873-4360-8eed-117691ecb0c4.jpg'
import photo16 from '../assets/Adv photos/9f45aafd-bd4a-4c66-9914-c834574d4446.jpg'
import photo17 from '../assets/Adv photos/a771106c-ae16-4446-9ea5-0972ed351c09.jpg'
import photo18 from '../assets/Adv photos/afd8955a-bcc0-4556-83db-728be3c194c0.jpg'
import photo19 from '../assets/Adv photos/c6c368f1-47e7-499b-9c4a-2929c470ab43.jpg'
import photo20 from '../assets/Adv photos/cd2ae01c-f8c7-4ff9-b468-d39e665863a0.jpg'
import photo21 from '../assets/Adv photos/e34dd712-b8ed-4a0a-b4c3-5008ade41fd7.jpg'
import photo22 from '../assets/Adv photos/ffec3bae-15ad-47cd-858a-5b6daac8d04f.jpg'

// Import practice area images
import familyLawImg from '../assets/Family.png'
import criminalLawImg from '../assets/criminal law.png'
import civilLawImg from '../assets/civil.png'
import realEstateLawImg from '../assets/Realestate.png'
import commercialLitigationImg from '../assets/Commercial litigation.png'
import consumerProtectionImg from '../assets/Consumer protection.png'
import claimPetitionsImg from '../assets/Claim.png'
import labourLawImg from '../assets/Labour.png'
import conveyancingImg from '../assets/Conveyancing and marriage registration.png'
import writPetitionImg from '../assets/Writ and special leave petition.png'

// Import slider images
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'

function Home() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
	const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(false)

	const practiceAreas = [
		{
			id: 1,
			title: "FAMILY LAW",
			description: "At Judicioworks Advocates and Associates, we recognise the sensitive nature of family and matrimonial law matters and approach each case with both compassion and strategy. Our practice covers a wide range of family-related issues, including divorce, child custody, alimony, adoption, and matters arising from domestic concerns. We place emphasis on the well-being and best interests of our clients and their families, offering thoughtful legal advice, effective negotiation, and representation before the courts when required. We regularly assist clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: familyLawImg,
			imageName: "Family Law",
			readMore: "Read More"
		},
		{
			id: 2,
			title: "CRIMINAL LAW",
			description: "Criminal law deals with offences, their prosecution, and the legal consequences that follow. At Judicioworks Advocates and Associates, our criminal law practice extends before the courts of Delhi, Ghaziabad, and Gautam Buddha Nagar. Matters arising from Indirapuram, Vaishali, and Vasundhara fall within the jurisdiction of the Ghaziabad courts, while cases from Noida, Greater Noida, and Greater Noida West are taken up before the courts of Gautam Buddha Nagar. Our advocates handle a broad spectrum of criminal cases, including serious charges such as rape, dowry death, and dowry harassment, as well as matters like traffic challans, narcotics-related offences, assault, theft, white-collar crimes, and juvenile cases. With considerable experience in criminal defence and a deep understanding of substantive and procedural law, we are committed to protecting the rights of individuals accused and ensuring due process at every stage of the proceedings.",
			image: criminalLawImg,
			imageName: "Criminal Law",
			readMore: "Read More"
		},
		{
			id: 3,
			title: "CIVIL LAW",
			description: "At Judicioworks Advocates and Associates, our practice in civil law covers a wide spectrum of disputes and legal concerns affecting both individuals and businesses. Civil law matters may include contracts, property disputes, family law, personal injury claims, among others. Our team is dedicated to offering informed guidance and effective representation, ensuring that each matter is approached with due care and attention to its unique circumstances. From resolving contractual issues to addressing family law concerns or pursuing rightful claims, we assist clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: civilLawImg,
			imageName: "Civil Law",
			readMore: "Read More"
		},
		{
			id: 4,
			title: "REAL ESTATE LAW",
			description: "At Judicioworks Advocates and Associates, our real estate law practice covers matters relating to the Real Estate (Regulation and Development) Act (RERA), property disputes, and consumer protection before consumer courts. We assist clients with a wide range of concerns, including real estate transactions, drafting and reviewing contracts, and addressing disputes through negotiation, mediation, or litigation where required. Our approach is to safeguard the rights and interests of our clients by providing clear, practical, and effective legal guidance. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: realEstateLawImg,
			imageName: "Real Estate Law",
			readMore: "Read More"
		},
		{
			id: 5,
			title: "COMMERCIAL LITIGATION",
			description: "At Judicioworks Advocates and Associates, our commercial litigation practice addresses a wide range of business disputes, including recovery proceedings, cheque dishonour matters, and arbitration cases. We focus on providing structured and strategic legal solutions that align with the specific requirements of each matter. Our approach is centred on protecting commercial interests through effective representation, negotiation, and, where required, proceedings before the courts or arbitral tribunals. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: commercialLitigationImg,
			imageName: "Commercial Litigation",
			readMore: "Read More"
		},
		{
			id: 6,
			title: "CONSUMER PROTECTION LAW",
			description: "At Judicioworks Advocates and Associates, our consumer protection practice is focused on safeguarding the rights of individuals and ensuring fairness in the marketplace. We assist clients with disputes involving defective products, deficient services, and unfair trade practices. Our approach includes providing clear legal guidance, pursuing appropriate remedies, and representing clients before consumer forums and courts where required. By addressing concerns such as faulty goods, misleading advertisements, and service deficiencies, we work to secure just outcomes for consumers. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: consumerProtectionImg,
			imageName: "Consumer Protection Law",
			readMore: "Read More"
		},
		{
			id: 7,
			title: "CLAIM PETITIONS",
			description: "At Judicioworks Advocates and Associates, we handle a wide spectrum of claim petitions, including railway accident claims and motor accident claims. Our work in this area focuses on ensuring that individuals and families receive just and fair compensation for the losses they have suffered. From gathering relevant evidence to addressing insurance-related concerns and, where necessary, representing clients before the courts, we provide structured legal support throughout the process. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: claimPetitionsImg,
			imageName: "Claim Petitions",
			readMore: "Read More"
		},
		{
			id: 8,
			title: "LABOUR AND EMPLOYMENT LAW",
			description: "At Judicioworks Advocates and Associates, our labour and employment law practice is designed to address the concerns of both employers and employees in an evolving workplace environment. We provide guidance on a broad range of matters, including compliance with labour regulations, employment contracts, workplace disputes, wrongful termination, discrimination, and claims relating to wages or benefits. Our approach is to offer practical solutions that safeguard rights and promote fair practices, while ensuring that each matter is handled with due care and attention. We regularly represent clients before the Ld. District Courts of Ghaziabad (which includes Indirapuram, Vasundhara, and Vaishali) and in Gautam Buddha Nagar (which includes Noida, Greater Noida, and Greater Noida West), as well as before the Hon'ble High Courts and the Hon'ble Supreme Court of India.",
			image: labourLawImg,
			imageName: "Labour and Employment Law",
			readMore: "Read More"
		},
		{
			id: 9,
			title: "CONVEYANCING AND COURT MARRIAGES",
			description: "At Judicioworks Advocates and Associates, we provide comprehensive legal services in conveyancing, legal advisory, and marriage registration. Our conveyancing practice assists clients in property transactions, ensuring that documentation, registration, and compliance requirements are handled smoothly and effectively. We also provide tailored legal advice across various areas of law, addressing individual and business needs with clarity and precision. In addition, we facilitate marriage registrations, including court marriages, by assisting clients with the necessary formalities and procedures before the Tehsil Dadri, Tehsil Ghaziabad, Sub-Registrar Office Dadri, Sub-Registrar Office Noida, and Sub-Registrar Office Ghaziabad, ensuring a seamless process in compliance with applicable legal requirements.",
			image: conveyancingImg,
			imageName: "Conveyancing and Court Marriages",
			readMore: "Read More"
		},
		{
			id: 10,
			title: "WRIT AND SPECIAL LEAVE PETITIONS",
			description: "At Judicioworks Advocates and Associates, our practice includes handling Writ Petitions and Special Leave Petitions (SLPs) before constitutional courts. We assist clients in matters involving fundamental rights, administrative actions, and appellate reliefs. Our role encompasses drafting, filing, and presenting petitions with a focus on structured advocacy and clear legal remedies under the constitutional and statutory framework. We regularly represent clients before the Hon'ble High Courts and the Hon'ble Supreme Court of India, ensuring that each matter is pursued with diligence and precision.",
			image: writPetitionImg,
			imageName: "Writ and Special Leave Petitions",
			readMore: "Read More"
		}
	]

	// Array of hero slider images
	const heroImages = [
		heroImg, image1, image2, image3
	]

	// Array of all photos for the founder section
	const founderPhotos = [
		photo2, photo3, photo4, photo5, photo9,
		photo11, photo12, photo13, photo14, photo15, photo17, photo18, photo19, photo20, photo21
	]

	// Handle screen size changes
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
			setCurrentSlide(0) // Reset to first slide when screen size changes
		}

		// Set initial screen size
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const timer = setInterval(() => {
			// For mobile: show 1 card at a time, for desktop: show 4 cards at a time
			const cardsPerSlide = isMobile ? 1 : 4
			setCurrentSlide((prev) => (prev + 1) % Math.ceil(practiceAreas.length / cardsPerSlide))
		}, 5000) // Reduced to 5 seconds for testing

		return () => clearInterval(timer)
	}, [practiceAreas.length, isMobile])

	// Timer for hero slider
	useEffect(() => {
		const heroTimer = setInterval(() => {
			setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
		}, 4000) // Change hero image every 4 seconds

		return () => clearInterval(heroTimer)
	}, [heroImages.length])

	// Timer for photo slider
	useEffect(() => {
		const photoTimer = setInterval(() => {
			setCurrentPhotoIndex((prev) => (prev + 1) % founderPhotos.length)
		}, 3000) // Change photo every 3 seconds

		return () => clearInterval(photoTimer)
	}, [founderPhotos.length])





	const nextSlide = () => {
		const cardsPerSlide = isMobile ? 1 : 4
		setCurrentSlide((prev) => (prev + 1) % Math.ceil(practiceAreas.length / cardsPerSlide))
	}

	const prevSlide = () => {
		const cardsPerSlide = isMobile ? 1 : 4
		setCurrentSlide((prev) => (prev - 1 + Math.ceil(practiceAreas.length / cardsPerSlide)) % Math.ceil(practiceAreas.length / cardsPerSlide))
	}


	return (
		<>
		<div className="min-h-screen relative overflow-hidden">
			{/* Light Professional Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-zinc-100"></div>
			<div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/60 via-purple-50/40 to-pink-50/60"></div>
			<div className="absolute inset-0 bg-gradient-to-bl from-cyan-50/50 via-blue-50/30 to-indigo-50/50"></div>
			<div className="absolute inset-0 bg-gradient-to-tl from-emerald-50/40 via-teal-50/20 to-cyan-50/40"></div>
			
			{/* Enhanced Moving Pattern Background */}
			<div className="absolute inset-0 opacity-30">
				<div className="absolute inset-0" style={{
					backgroundImage: `radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 3px, transparent 3px),
									radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.12) 2px, transparent 2px),
									radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.1) 2px, transparent 2px),
									radial-gradient(circle at 60% 30%, rgba(236, 72, 153, 0.08) 2px, transparent 2px)`,
					backgroundSize: '100px 100px, 80px 80px, 120px 120px, 60px 60px',
					backgroundPosition: '0 0, 40px 40px, 20px 20px, 60px 60px',
					animation: 'moving-pattern 25s linear infinite'
				}}></div>
			</div>
			
			{/* Animated Geometric Patterns */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-indigo-300/30 rounded-full animate-spin" style={{animationDuration: '30s'}}></div>
				<div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-purple-300/30 rounded-full animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
				<div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-cyan-300/40 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
				<div className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-pink-300/35 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
			</div>
			
			{/* Floating Particles */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/6 w-2 h-2 bg-indigo-400/60 rounded-full animate-float-particle" style={{animationDelay: '0s'}}></div>
				<div className="absolute top-1/3 right-1/5 w-1 h-1 bg-purple-400/70 rounded-full animate-float-particle" style={{animationDelay: '2s'}}></div>
				<div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-float-particle" style={{animationDelay: '4s'}}></div>
				<div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-pink-400/60 rounded-full animate-float-particle" style={{animationDelay: '6s'}}></div>
				<div className="absolute top-2/3 left-1/2 w-2 h-2 bg-emerald-400/40 rounded-full animate-float-particle" style={{animationDelay: '8s'}}></div>
				<div className="absolute top-1/6 right-1/2 w-1 h-1 bg-yellow-400/50 rounded-full animate-float-particle" style={{animationDelay: '10s'}}></div>
			</div>
			
			{/* Animated Lines */}
			<div className="absolute inset-0 opacity-15">
				<div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/50 to-transparent animate-line-move" style={{animationDelay: '0s'}}></div>
				<div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-line-move" style={{animationDelay: '3s'}}></div>
				<div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-line-move" style={{animationDelay: '6s'}}></div>
			</div>
			
			{/* Animated Floating Elements */}
			<div className="absolute inset-0">
				{/* Large floating shapes */}
				<div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl animate-moving-float"></div>
				<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-200/25 to-blue-200/25 rounded-full blur-2xl animate-moving-float-reverse delay-1000"></div>
				<div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full blur-2xl animate-moving-glow delay-2000"></div>
				<div className="absolute bottom-10 right-1/3 w-56 h-56 bg-gradient-to-r from-emerald-200/25 to-teal-200/25 rounded-full blur-2xl animate-moving-float delay-3000"></div>
				
				{/* Medium floating elements */}
				<div className="absolute top-1/3 left-1/4 w-40 h-40 bg-gradient-to-r from-violet-200/30 to-purple-200/30 rounded-full blur-xl animate-moving-float-gentle delay-500"></div>
				<div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-200/25 to-indigo-200/25 rounded-full blur-xl animate-moving-pulse delay-1500"></div>
				
				{/* Small accent elements */}
				<div className="absolute top-1/2 left-1/6 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 rounded-full blur-lg animate-moving-twinkle delay-2500"></div>
				<div className="absolute bottom-1/2 right-1/6 w-32 h-32 bg-gradient-to-r from-pink-200/35 to-rose-200/35 rounded-full blur-lg animate-moving-twinkle delay-3500"></div>
			</div>
			
			{/* Moving Grid Pattern */}
			<div className="absolute inset-0 opacity-15">
				<div className="absolute inset-0" style={{
					backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
									linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
									linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
									linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px)`,
					backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
					animation: 'moving-grid 15s linear infinite'
				}}></div>
			</div>
			
			{/* Moving Geometric Elements */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-1/4 left-1/3 w-32 h-32 border border-indigo-300/40 rounded-full animate-moving-spin" style={{animationDuration: '20s'}}></div>
				<div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-300/40 rounded-full animate-moving-spin-reverse" style={{animationDuration: '25s'}}></div>
				<div className="absolute top-1/2 right-1/3 w-16 h-16 border border-cyan-300/50 rounded-full animate-moving-pulse-slow" style={{animationDuration: '8s'}}></div>
			</div>
			
			{/* Moving Light Rays */}
			<div className="absolute inset-0 opacity-25">
				<div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-300/50 to-transparent animate-moving-light-ray"></div>
				<div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300/40 to-transparent animate-moving-light-ray delay-1000"></div>
				<div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent animate-moving-light-ray delay-2000"></div>
			</div>
			
			{/* Hero Section - Full width with team image background */}
			<section className="relative z-10 min-h-[70vh] sm:min-h-screen flex items-center justify-center">
				{/* Background Image with Dark Overlay */}
				<div className="absolute inset-0">
					<img
						src={heroImages[currentHeroIndex]}
						alt="Legal Team"
						className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
						key={currentHeroIndex}
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
				</div>
				

				{/* Content Overlay */}
				<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight mb-8">
						<div>
							<div className="heading-line text-sm sm:text-base md:text-lg font-sans font-normal text-white/90 mb-2">
								Welcome to
							</div>
							<div className="heading-line font-bold mb-2">
								Judicioworks
							</div>
							<div className="heading-line font-bold mb-2">
								Advocates and Associates
							</div>
							<div className="heading-line text-sm sm:text-base md:text-lg font-sans font-normal text-white/90">
								(The Group of Advocates You Need)
							</div>
						</div>
					</h1>
					<div className="mb-8">
						<p className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-4xl mx-auto font-sans font-normal">
							where legal excellence meets client satisfaction. Our firm is dedicated to providing comprehensive legal solutions tailored to meet the diverse needs of our clients in Delhi-NCR, with a focus on Ghaziabad, Noida, Greater Noida, and Greater Noida West
						</p>
					</div>
					<div className="flex justify-center">
						<Link
							to="/service"
							className="group inline-flex items-center justify-center rounded-lg bg-amber-600 hover:bg-amber-700 px-6 py-3 md:px-8 md:py-4 text-white font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base md:text-lg relative overflow-hidden shadow-lg"
						>
							<span className="relative z-10 flex items-center">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>Explore Our Services</span>
								<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</Link>
					</div>
				</div>
				
				{/* Carousel Indicators */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
					{heroImages.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentHeroIndex(index)}
							className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 border-2 ${
								index === currentHeroIndex 
									? 'bg-white border-yellow-400 shadow-lg scale-110' 
									: 'bg-white/50 border-white/30 hover:bg-white/70 hover:border-white/50'
							}`}
						/>
					))}
				</div>
			</section>

			{/* Practice Areas Section */}
			<section className="py-1 md:py-16 relative mt-8 md:mt-0">
				{/* Gradient Background for Practice Areas */}
				<div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20"></div>
				<div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<h2 className="text-lg md:text-4xl font-bold text-center text-gray-800 mb-2 md:mb-12">PRACTICE AREAS</h2>
					
					<div className="relative">
						{/* Navigation Buttons */}
						<button
							onClick={prevSlide}
							className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						
						<button
							onClick={nextSlide}
							className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>

						{/* Slider Container */}
						<div className="overflow-hidden">
							<div 
								className="flex transition-transform duration-500 ease-in-out"
								style={{ transform: `translateX(-${currentSlide * 100}%)` }}
							>
								{/* Desktop: 3 cards per slide */}
								{Array.from({ length: Math.ceil(practiceAreas.length / 3) }, (_, slideIndex) => (
									<div key={slideIndex} className="hidden md:flex gap-6 min-w-full">
										{practiceAreas.slice(slideIndex * 3, slideIndex * 3 + 3).map((area) => (
											<div key={area.id} className="flex-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
												{/* Image Section - Larger */}
												<div className="relative h-48">
													<img 
														src={area.image} 
														alt={area.title}
														className="w-full h-full object-cover"
													/>
													{/* Image Name Overlay */}
													<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
														<p className="text-white text-sm font-medium">{area.imageName}</p>
													</div>
												</div>
												{/* Content Section */}
												<div className="p-4 flex flex-col flex-grow">
													{/* Icon and Title */}
													<div className="flex items-start mb-3">
														<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
															<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
															</svg>
														</div>
														<h3 className="text-lg font-bold text-gray-800 leading-tight">{area.title}</h3>
													</div>
													{/* Description */}
													<p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
														{area.description.substring(0, 120)}...
													</p>
													{/* View Detail Link */}
													<div className="mt-auto">
														<Link 
															to={`/practice-area/${area.id}`}
															className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-300"
														>
															<span>View Detail</span>
															<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
															</svg>
														</Link>
													</div>
												</div>
											</div>
										))}
									</div>
								))}
								
								{/* Mobile: 1 card per slide */}
								{practiceAreas.map((area, index) => (
									<div key={`mobile-${area.id}`} className="md:hidden flex justify-center min-w-full px-2">
										<div className="w-full max-w-sm bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
											{/* Image Section - Larger */}
											<div className="relative h-40">
												<img 
													src={area.image} 
													alt={area.title}
													className="w-full h-full object-cover"
												/>
												{/* Image Name Overlay */}
												<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
													<p className="text-white text-xs font-medium">{area.imageName}</p>
												</div>
											</div>
											{/* Content Section */}
											<div className="p-4 flex flex-col flex-grow">
												{/* Icon and Title */}
												<div className="flex items-start mb-3">
													<div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
														<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
													</div>
													<h3 className="text-base font-bold text-gray-800 leading-tight">{area.title}</h3>
												</div>
												{/* Description */}
												<p className="text-gray-600 mb-4 leading-relaxed text-xs flex-grow">
													{area.description.substring(0, 80)}...
												</p>
												{/* View Detail Link */}
												<div className="flex-shrink-0 mt-auto">
													<Link 
														to={`/practice-area/${area.id}`}
														className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors duration-300"
													>
														<span>View Detail</span>
														<svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
														</svg>
													</Link>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Dots Indicator */}
						<div className="flex justify-center mt-4 md:mt-8 space-x-2">
							{/* Desktop dots */}
							<div className="hidden md:flex space-x-2">
								{Array.from({ length: Math.ceil(practiceAreas.length / 3) }, (_, index) => (
									<button
										key={index}
										onClick={() => setCurrentSlide(index)}
										className={`w-3 h-3 rounded-full transition-all duration-300 ${
											index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
										}`}
									/>
								))}
							</div>
							
							{/* Mobile dots */}
							<div className="md:hidden flex space-x-2">
								{practiceAreas.map((_, index) => (
									<button
										key={`mobile-dot-${index}`}
										onClick={() => setCurrentSlide(index)}
										className={`w-3 h-3 rounded-full transition-all duration-300 ${
											index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Founder Section */}
			<section className="py-6 md:py-20 relative overflow-hidden">
				{/* Beautiful Gradient Background for Founder Section */}
				<div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300"></div>
				<div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 via-transparent to-purple-100/30"></div>
				{/* Background overlay */}
				<div className="absolute inset-0 bg-white/10"></div>
				
				{/* Animated background elements */}
				<div className="absolute inset-0">
					<div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
					<div className="absolute top-40 right-20 w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
					<div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full animate-ping"></div>
					<div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white/25 rounded-full animate-pulse"></div>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					{/* Section Header */}
					<div className="text-center mb-4 md:mb-16">
						<h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 md:mb-6 animate-fade-in-up">
							Our Founder
						</h2>
						<div className="w-24 h-1 bg-gray-600 mx-auto rounded-full animate-scale-in"></div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
						{/* Founder Information */}
						<div className="animate-fade-in-left group min-h-[400px] lg:h-[500px] flex">
							<div className="bg-white/60 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-gray-300/50 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:bg-white/70 relative overflow-hidden w-full flex flex-col">
								{/* Animated background gradient */}
								<div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<div className="relative z-10 flex flex-col h-full">
									<h3 className="text-lg lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-4 group-hover:text-gray-900 transition-colors duration-300">
										Rishabh Malhotra (Advocate)
									</h3>
									<p className="text-gray-700 text-sm lg:text-lg leading-relaxed mb-4 lg:mb-6 group-hover:text-gray-800 transition-colors duration-300 text-justify flex-grow">
										Founder and Principal Advocate at Judicioworks Advocates and Associates. 
										With 5 years of experience in this legal field, Rishabh Malhotra (Advocate) 
										has established a reputation for excellence, integrity, and dedication 
										to client success. Specialised in family law, criminal law, civil law, 
										consumer protection law, real estate law and labour law.
									</p>
									<div className="space-y-2 lg:space-y-4 mt-auto">
										<div className="flex items-center space-x-2 lg:space-x-3 group-hover:translate-x-2 transition-transform duration-300">
											<div className="w-2 h-2 lg:w-3 lg:h-3 bg-gray-600 rounded-full animate-pulse group-hover:bg-gray-800 transition-colors duration-300"></div>
											<span className="text-gray-700 text-xs lg:text-base group-hover:text-gray-800 transition-colors duration-300">5 Years of Legal Experience</span>
										</div>
										<div className="flex items-center space-x-2 lg:space-x-3 group-hover:translate-x-2 transition-transform duration-300 delay-100">
											<div className="w-2 h-2 lg:w-3 lg:h-3 bg-gray-600 rounded-full animate-pulse group-hover:bg-gray-800 transition-colors duration-300"></div>
											<span className="text-gray-700 text-xs lg:text-base group-hover:text-gray-800 transition-colors duration-300">Specialized in Family, Criminal & Civil Law</span>
										</div>
										<div className="flex items-center space-x-2 lg:space-x-3 group-hover:translate-x-2 transition-transform duration-300 delay-200">
											<div className="w-2 h-2 lg:w-3 lg:h-3 bg-gray-600 rounded-full animate-pulse group-hover:bg-gray-800 transition-colors duration-300"></div>
											<span className="text-gray-700 text-xs lg:text-base group-hover:text-gray-800 transition-colors duration-300">Expert in Consumer Protection & Real Estate Law</span>
										</div>
										<div className="flex items-center space-x-2 lg:space-x-3 group-hover:translate-x-2 transition-transform duration-300 delay-300">
											<div className="w-2 h-2 lg:w-3 lg:h-3 bg-gray-600 rounded-full animate-pulse group-hover:bg-gray-800 transition-colors duration-300"></div>
											<span className="text-gray-700 text-xs lg:text-base group-hover:text-gray-800 transition-colors duration-300">Committed to Client Success</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Photo Slider */}
						<div className="relative animate-fade-in-right group min-h-[300px] lg:h-[500px]">
							{/* Slider Container */}
							<div className="relative h-full w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 border-4 border-yellow-400/30">
								{/* Main Slider Display */}
								<div className="relative h-full w-full overflow-hidden">
									<div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentPhotoIndex * 100}%)` }}>
										{founderPhotos.map((photo, index) => (
											<div key={index} className="w-full h-full flex-shrink-0 relative">
												<img
													src={photo}
													alt={`Founder Photo ${index + 1}`}
													className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
												/>
												{/* Overlay gradient */}
												<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
												{/* Hover effect overlay */}
												<div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
											</div>
										))}
									</div>
								</div>

								{/* Navigation Arrows */}
								<button
									onClick={() => setCurrentPhotoIndex((prev) => (prev - 1 + founderPhotos.length) % founderPhotos.length)}
									className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-yellow-400/80 backdrop-blur-sm text-white p-3 rounded-full shadow-xl hover:bg-yellow-500 hover:text-white transition-all duration-300 border-2 border-yellow-300 hover:border-yellow-400 hover:scale-110"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
									</svg>
								</button>
								
								<button
									onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % founderPhotos.length)}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-yellow-400/80 backdrop-blur-sm text-white p-3 rounded-full shadow-xl hover:bg-yellow-500 hover:text-white transition-all duration-300 border-2 border-yellow-300 hover:border-yellow-400 hover:scale-110"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
									</svg>
								</button>

								{/* Photo Counter */}
								<div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium group-hover:bg-yellow-400/20 group-hover:text-yellow-200 transition-all duration-300">
									{currentPhotoIndex + 1} / {founderPhotos.length}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Reviews/Feedback Section */}
			<ReviewsSlider />

		</div>
		
		{/* Footer - Outside main container to ensure proper visibility */}
		<Footer />
		</>
	)
}

export default Home 