import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import logoImg from '../assets/logo.jpg'

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header className="bg-white sticky top-0 z-50 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link to="/" className="flex items-center gap-2 sm:gap-3">
						<img src={logoImg} alt="Logo" className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover" />
						<div className="flex flex-col">
							<span className="text-xs sm:text-lg lg:text-xl font-semibold text-gray-800 leading-tight">
								Judicioworks Advocates and Associates
							</span>
							<span className="text-xs sm:text-sm text-gray-500">(The Group Of Advocates You Need)</span>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
						<NavLink to="/" end className={({ isActive }) => `hover:text-brand ${isActive ? 'text-brand' : 'text-gray-700'}`}>Home</NavLink>
						<NavLink to="/about" className={({ isActive }) => `hover:text-brand ${isActive ? 'text-brand' : 'text-gray-700'}`}>About</NavLink>
						<NavLink to="/team" className={({ isActive }) => `hover:text-brand ${isActive ? 'text-brand' : 'text-gray-700'}`}>Team</NavLink>
						<NavLink to="/blog" className={({ isActive }) => `hover:text-brand ${isActive ? 'text-brand' : 'text-gray-700'}`}>Blog</NavLink>
						<NavLink to="/contact" className={({ isActive }) => `hover:text-brand ${isActive ? 'text-brand' : 'text-gray-700'}`}>Contact</NavLink>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand hover:bg-gray-100 transition-colors duration-200"
						aria-label="Toggle menu"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Navigation Menu */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-gray-200 bg-white">
						<nav className="py-4 space-y-2">
							<NavLink 
								to="/" 
								end 
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) => `block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${isActive ? 'text-brand bg-brand/10' : 'text-gray-700 hover:text-brand hover:bg-gray-100'}`}
							>
								Home
							</NavLink>
							<NavLink 
								to="/about" 
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) => `block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${isActive ? 'text-brand bg-brand/10' : 'text-gray-700 hover:text-brand hover:bg-gray-100'}`}
							>
								About
							</NavLink>
							<NavLink 
								to="/team" 
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) => `block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${isActive ? 'text-brand bg-brand/10' : 'text-gray-700 hover:text-brand hover:bg-gray-100'}`}
							>
								Team
							</NavLink>
							<NavLink 
								to="/blog" 
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) => `block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${isActive ? 'text-brand bg-brand/10' : 'text-gray-700 hover:text-brand hover:bg-gray-100'}`}
							>
								Blog
							</NavLink>
							<NavLink 
								to="/contact" 
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) => `block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${isActive ? 'text-brand bg-brand/10' : 'text-gray-700 hover:text-brand hover:bg-gray-100'}`}
							>
								Contact
							</NavLink>
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}

export default Navbar 