import { useState, useEffect } from 'react';

const ReviewsSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Background colors for profile photos
    const profileColors = [
        'bg-gradient-to-br from-blue-500 to-blue-600',
        'bg-gradient-to-br from-green-500 to-green-600',
        'bg-gradient-to-br from-purple-500 to-purple-600',
        'bg-gradient-to-br from-pink-500 to-pink-600',
        'bg-gradient-to-br from-indigo-500 to-indigo-600',
        'bg-gradient-to-br from-red-500 to-red-600',
        'bg-gradient-to-br from-yellow-500 to-yellow-600',
        'bg-gradient-to-br from-teal-500 to-teal-600'
    ];

    // Static reviews data from the provided images
    const reviews = [
        {
            _id: 'review1',
            name: 'Amrit Pal',
            overall_rating: 5,
            feedback_text: 'I had a great experience with Judicioworks Advocates and Associates. The team is highly professional, approachable, and very clear in explaining the legal process. They provided excellent guidance and handled my case with complete dedication.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
            reviewCount: 9,
            photoCount: 45
        },
        {
            _id: 'review2',
            name: 'Gaurav Malik',
            overall_rating: 5,
            feedback_text: 'I had an outstanding experience with Advocate Rishabh. He is extremely knowledgeable, professional, and dedicated to his clients\' best interests. From our very first meeting, he explained every step of the legal process in clear, simple terms.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            reviewCount: 5,
            photoCount: 65
        },
        {
            _id: 'review3',
            name: 'Abu Zafar',
            overall_rating: 5,
            feedback_text: 'I am very thankful to this divorce lawyer for their constant support during such a challenging phase of my life. They not only provided excellent legal guidance but also showed empathy and patience throughout the process. Their expertise made a difficult situation much more manageable.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks ago
            reviewCount: 2
        },
        {
            _id: 'review4',
            name: 'Raena Tabassum',
            overall_rating: 5,
            feedback_text: 'I had a very positive experience with this criminal lawyer. They are highly skilled, professional, and extremely dedicated to their clients. From the very beginning, they listened carefully, explained the legal process in simple terms, and provided excellent representation.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks ago
            reviewCount: 1
        },
        {
            _id: 'review5',
            name: 'Hena Naaz',
            overall_rating: 5,
            feedback_text: 'I had an outstanding experience with this criminal lawyer. Their knowledge of the law, sharp arguments, and confident approach in court gave me complete trust in their abilities. They were always approachable, explained every detail clearly, and fought tirelessly for my case.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks ago
            reviewCount: 1
        },
        {
            _id: 'review6',
            name: 'Raena Tabassum',
            overall_rating: 5,
            feedback_text: 'I had a very positive experience with this divorce lawyer. The entire process was handled with professionalism, compassion, and clear communication. Every step was explained in a way that made things less overwhelming, and I always felt supported throughout the journey.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks ago
            reviewCount: 1
        },
        {
            _id: 'review7',
            name: 'ELITE VULTURE GAMING',
            overall_rating: 5,
            feedback_text: 'Judicioworks Advocates and Associates is the go-to place for anyone seeking a reliable divorce lawyer in Noida. Their team handled my case with sensitivity and professionalism, ensuring a smooth process. Highly recommend Advocate Rishabh Malhotra',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(), // 8 months ago
            reviewCount: 2
        },
        {
            _id: 'review8',
            name: 'Sufia Shahzad',
            overall_rating: 5,
            feedback_text: 'I had an excellent experience with this criminal lawyer. They explained everything clearly, guided me at every step, and fought my case with full dedication. Truly dependable and trustworthy.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
            reviewCount: 3
        },
        {
            _id: 'review9',
            name: 'Aman Kumar',
            overall_rating: 5,
            feedback_text: 'I had a tough divorce case that stretched for months, but Judicioworks Advocates and Associates handled everything with exceptional professionalism. Their team, led by Advocate Rishabh Malhotra, was thorough, empathetic, and always available to address my concerns.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(), // 8 months ago
            reviewCount: 2
        },
        {
            _id: 'review10',
            name: 'Khushi Gupta',
            overall_rating: 5,
            feedback_text: 'Judicioworks Advocates And Associates provided me with outstanding service during a very challenging time in my life. The divorce lawyer in Noida was thorough and spoke in clear terms that made the entire process understandable. Their expertise and compassion made all the difference.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
            reviewCount: 3
        },
        {
            _id: 'review11',
            name: 'CHUNMUN KUMAR',
            overall_rating: 5,
            feedback_text: 'Judicioworks Advocates handled my cheque bounce case and recovery suit with great skill. Advocate Rishabh Malhotra personally ensured the matter was resolved efficiently. They\'re one of the few law firms in Noida that prioritize their clients\' needs so effectively.',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(), // 8 months ago
            reviewCount: 2
        },
        {
            _id: 'review12',
            name: 'Satyendra Jha',
            overall_rating: 5,
            feedback_text: 'If you need a criminal lawyer in Noida, Judicioworks is where to go. They are incredibly professional and knowledgeable. Their approach to divorce cases is equally impressive. Trustworthy advocates who deliver results',
            recommendation: 'yes',
            createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(), // 8 months ago
            reviewCount: 3
        }
    ];

    // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setCurrentSlide(0); // Reset to first slide when screen size changes
        };

        // Set initial screen size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate number of slides (responsive: 1 card on mobile, 3 cards on laptop)
    const cardsPerSlide = isMobile ? 1 : 3;
    const totalSlides = Math.ceil(reviews.length / cardsPerSlide);

    // Auto-slide functionality
    useEffect(() => {
        if (reviews.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => {
                    // Loop back to first slide after the last one
                    return (prev + 1) % totalSlides;
                });
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [totalSlides, isMobile]);

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            // Loop back to first slide after the last one
            return (prev + 1) % totalSlides;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            // Loop back to last slide before the first one
            return (prev - 1 + totalSlides) % totalSlides;
        });
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Get reviews for current slide
    const getCurrentSlideReviews = () => {
        const startIndex = currentSlide * cardsPerSlide;
        const endIndex = startIndex + cardsPerSlide;
        return reviews.slice(startIndex, endIndex);
    };

    // Render stars
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`text-sm md:text-lg ${
                    i < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
            >
                ★
            </span>
        ));
    };

    // Get first letter of name
    const getFirstLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    // Get profile color
    const getProfileColor = (index) => {
        return profileColors[index % profileColors.length];
    };

    // Format time ago
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1 day ago';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 14) return '1 week ago';
        if (diffInDays < 28) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    };


    return (
        <section className="py-8 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
            
            <div className="container mx-auto px-2 md:px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
                        (Discover the experiences and feedback from our valued clients)
                    </p>
                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-3 md:mt-6 rounded-full"></div>
                </div>

                {/* Reviews Card Slider */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Cards Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {/* Generate slides */}
                            {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className={`flex ${isMobile ? 'justify-center' : 'gap-4 md:gap-6'} px-2`}>
                                        {reviews.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide).map((review, index) => (
                                            <div
                                                key={review._id}
                                                className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${
                                                    isMobile ? 'w-full max-w-2xl' : 'flex-1 min-w-0'
                                                }`}
                                            >
                                                {/* Background pattern */}
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full -translate-y-10 translate-x-10"></div>
                                                
                                                <div className="relative z-10">
                                                    {/* Profile Section */}
                                                    <div className="flex items-center mb-3 md:mb-4">
                                                        <div className={`${isMobile ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'} rounded-full ${getProfileColor(slideIndex * cardsPerSlide + index)} flex items-center justify-center text-white ${isMobile ? 'text-sm md:text-lg' : 'text-xs md:text-sm'} font-bold shadow-lg`}>
                                                            {getFirstLetter(review.name)}
                                                        </div>
                                                        <div className={isMobile ? 'ml-3' : 'ml-2'}>
                                                            <h3 className={`${isMobile ? 'text-sm md:text-base' : 'text-xs md:text-sm'} font-semibold text-gray-800`}>
                                                                {review.name}
                                                            </h3>
                                                            <div className="flex items-center">
                                                                {renderStars(review.overall_rating)}
                                                                <span className="ml-1 text-gray-600 text-xs">
                                                                    ({review.overall_rating}/5)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Review Content */}
                                                    <blockquote className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3 md:mb-4 italic">
                                                        "{isMobile ? review.feedback_text : (review.feedback_text.length > 120 ? review.feedback_text.substring(0, 120) + '...' : review.feedback_text)}"
                                                    </blockquote>

                                                    {/* Review Stats */}
                                                    {review.reviewCount && (
                                                        <div className="text-xs text-gray-500 mb-2">
                                                            {review.reviewCount} reviews
                                                            {review.photoCount && ` · ${review.photoCount} photos`}
                                                        </div>
                                                    )}

                                                    {/* Recommendation and Date */}
                                                    <div className="flex items-center justify-between">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            review.recommendation === 'yes' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {review.recommendation === 'yes' ? '👍 Recommended' : '👎 Not Recommended'}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {getTimeAgo(review.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center mt-6 md:mt-8 space-x-2 md:space-x-4">
                        <button
                            onClick={prevSlide}
                            className="p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-600 hover:text-blue-600"
                        >
                            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex space-x-1 md:space-x-2">
                            {Array.from({ length: totalSlides }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? 'bg-blue-600 w-6 md:w-8 shadow-lg'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-600 hover:text-blue-600"
                        >
                            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSlider;
