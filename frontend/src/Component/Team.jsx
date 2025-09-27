// Import team member photos
import rishabhPhoto from '../assets/Adv photos/4f591e18-242c-4ffb-86b5-6946b8dca0b2.jpg'
import gajendraPhoto from '../assets/Adv photos/0e09e9db-eadc-45f0-b5b8-ba2f2119124a.jpg'
import raghavPhoto from '../assets/RAGHAV SEHGAL .jpg'
import jaskaranPhoto from '../assets/JASKARAN SINGH BHANDARI .jpg'

function Team() {
	const teamMembers = [
		{
			id: 1,
			name: "RISHABH MALHOTRA",
			title: "ADVOCATE & FOUNDER",
			role: "FOUNDER",
			image: rishabhPhoto,
			description: ""
		},
		{
			id: 2,
			name: "GAJENDRA SINGH ARYA",
			title: "ADVOCATE",
			role: "MENTOR",
			image: gajendraPhoto,
			description: ""
		},
		{
			id: 3,
			name: "RAGHAV SEHGAL",
			title: "ADVOCATE",
			role: "ASSOCIATE",
			image: raghavPhoto,
			description: ""
		},
		{
			id: 4,
			name: "JASKARAN SINGH BHANDARI",
			title: "ADVOCATE",
			role: "ASSOCIATE",
			image: jaskaranPhoto,
			description: ""
		},
		{
			id: 5,
			name: "AFTAB AHMAD",
			title: "PARALEGAL",
			role: "PARALEGAL",
			image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAzNDBDMTAwIDI4NS4yMjkgMTQ1LjIyOSAyNDAgMjAwIDI0MEMyNTQuNzcxIDI0MCAzMDAgMjg1LjIyOSAzMDAgMzQwVjM2MEgxMDBWMzQwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K",
			description: ""
		},
	]

	return (
		<div style={{ backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
			<div className="text-center mb-8 md:mb-16">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 relative">
					Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Team</span>
				</h1>
				<p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-4 md:mb-8">
					(Meet our experienced legal professionals dedicated to your success)
				</p>
				<div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
				{teamMembers.map((member) => (
					<div key={member.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
						<div className="relative">
							<img 
								src={member.image} 
								alt={member.name}
								className="w-full h-48 md:h-80 object-cover"
							/>
							<div className="absolute top-1 md:top-4 right-1 md:right-4 bg-brand text-white px-1 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
								{member.role}
							</div>
						</div>
						<div className="p-3 md:p-6 text-center">
							<h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{member.name}</h3>
							<p className="text-brand font-semibold mb-1 md:mb-2 text-xs md:text-base">{member.title}</p>
							<p className="text-gray-600 leading-relaxed text-xs md:text-base">{member.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
		</div>
	)
}

export default Team 