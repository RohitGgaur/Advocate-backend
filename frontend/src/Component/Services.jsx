function Services() {
	return (
		<div style={{ backgroundColor: '#8b8b8b', minHeight: '100vh' }}>
			<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h2 className="text-3xl font-semibold mb-6 text-white">Services</h2>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{[
					{ title: 'Civil Litigation', desc: 'Representation in civil disputes with a strategic approach.' },
					{ title: 'Criminal Defense', desc: 'Protecting your rights with strong legal defense.' },
					{ title: 'Corporate Law', desc: 'End-to-end legal support for businesses and startups.' },
					{ title: 'Family Law', desc: 'Compassionate assistance for family-related matters.' },
					{ title: 'Property Law', desc: 'Advisory and dispute resolution for property cases.' },
					{ title: 'Contract Drafting', desc: 'Precise contract creation and review services.' },
				].map((s) => (
					<div key={s.title} className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-sm">
						<h3 className="text-xl font-semibold mb-2 text-white">{s.title}</h3>
						<p className="text-white/90">{s.desc}</p>
					</div>
				))}
			</div>
		</section>
		</div>
	)
}

export default Services 