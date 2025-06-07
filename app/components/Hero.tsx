// components/Hero.tsx
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 py-4 md:py-4 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 z-10 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4">
            Premium Industrial <span className="text-primary">Machinery</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg">
            High-performance machines for your business needs. Quality engineered for durability and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center">
              Shop Now <FiArrowRight className="ml-2" />
            </button>
            <button className="border-2 border-dark hover:bg-dark hover:text-white px-6 py-3 rounded-lg font-medium transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 relative">
          <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
            <Image 
              src="/bb.png" // Replace with your actual image path
              alt="Industrial Machine"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary rounded-full opacity-20 z-0"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-warning rounded-full opacity-10"></div>
    </section>
  );
};

export default Hero;