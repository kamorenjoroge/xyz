// components/ShopAd.tsx
"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiArrowRight, FiShoppingCart, FiTool, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ShopAd = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const ads = [
    {
      id: 1,
      title: "Seasonal Sale",
      subtitle: "on Industrial Machines",
      description: "Upgrade your workshop with premium machinery at discounted prices. Limited time offer!",
      discount: "25% OFF",
      primaryLink: "/shop/sale",
      primaryText: "Shop Now",
      secondaryLink: "/contact",
      secondaryText: "Get a Quote",
      icon: FiShoppingCart,
      bgGradient: "from-primary/10 to-secondary",
      accentColor: "primary",
      discountBg: "warning",
      accentColorClass: "text-primary",
      bgAccentClass: "bg-primary",
      borderAccentClass: "border-primary"
    },
    {
      id: 2,
      title: "Professional Tools",
      subtitle: "for Every Project",
      description: "Discover our comprehensive collection of professional-grade tools designed for precision and durability.",
      discount: "30% OFF",
      primaryLink: "/shop/tools",
      primaryText: "Browse Tools",
      secondaryLink: "/catalog",
      secondaryText: "View Catalog",
      icon: FiTool,
      bgGradient: "from-primary/10 to-accent/20",
      accentColor: "primary",
      discountBg: "primary",
      accentColorClass: "text-primary",
      bgAccentClass: "bg-primary",
      borderAccentClass: "border-primary"
    },
    {
      id: 3,
      title: "Maintenance Services",
      subtitle: "& Equipment Repair",
      description: "Keep your machinery running at peak performance with our expert maintenance and repair services.",
      discount: "FREE QUOTE",
      primaryLink: "/services",
      primaryText: "Learn More",
      secondaryLink: "/contact",
      secondaryText: "Schedule Service",
      icon: FiSettings,
      bgGradient: "from-accent/10 to-primary/20",
      accentColor: "accent",
      discountBg: "primary",
      accentColorClass: "text-accent",
      bgAccentClass: "bg-accent",
      borderAccentClass: "border-accent"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, ads.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentAd = ads[currentSlide];
  const IconComponent = currentAd.icon;

  return (
    <section 
      className={`relative bg-gradient-to-r ${currentAd.bgGradient} overflow-hidden rounded-xl transition-all duration-700 ease-in-out`}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Text Content - now comes second on mobile */}
          <div className="w-full md:w-1/2 z-10 order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4 transition-all duration-500">
              <span className={currentAd.accentColorClass}>{currentAd.title}</span> {currentAd.subtitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-800 mb-4 sm:mb-6 max-w-lg transition-all duration-500">
              {currentAd.description}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                href={currentAd.primaryLink}
                className={`flex items-center gap-2 ${currentAd.bgAccentClass} hover:${currentAd.bgAccentClass}/90 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base`}
              >
                {currentAd.primaryText} <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link 
                href={currentAd.secondaryLink}
                className="flex items-center gap-2 border-2 border-dark hover:bg-dark hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
              >
                {currentAd.secondaryText}
              </Link>
            </div>
          </div>

          {/* Image/Graphic - now comes first on mobile */}
          <div className="w-full md:w-1/2 relative flex justify-center order-1 md:order-2">
            <div className="relative w-full max-w-xs sm:max-w-md h-48 sm:h-64 md:h-80">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-500 transform">
                <IconComponent className={`h-16 sm:h-20 w-16 sm:w-20 ${currentAd.accentColorClass} transition-all duration-500`} />
                <div className={`absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-${currentAd.discountBg} text-white font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg transition-all duration-500 text-sm sm:text-base`}>
                  {currentAd.discount}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          {/* Navigation Dots */}
          <div className="flex gap-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? currentAd.bgAccentClass 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow Controls */}
          <div className="flex gap-2 ml-2 sm:ml-4">
            <button
              onClick={prevSlide}
              className="p-1 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300"
              aria-label="Next slide"
            >
              <FiChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
            </button>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-1 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300 ml-1 sm:ml-2"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <div className="w-3 h-3 sm:w-4 sm:h-4 flex gap-0.5 sm:gap-1">
                <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-gray-700"></div>
                <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-gray-700"></div>
              </div>
            ) : (
              <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                <div className="w-0 h-0 border-l-3 sm:border-l-4 border-l-gray-700 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5 sm:ml-1"></div>
              </div>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
          <div 
            className={`h-full ${currentAd.bgAccentClass} transition-all duration-100 ease-linear`}
            style={{
              width: isPlaying ? '100%' : '0%',
              animation: isPlaying ? 'progress 5s linear infinite' : 'none'
            }}
          />
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 ${currentAd.bgAccentClass}/10 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-700`}></div>
        <div className={`absolute bottom-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-${currentAd.discountBg}/10 rounded-full translate-x-1/2 translate-y-1/2 transition-all duration-700`}></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ShopAd;