import { useState, useRef } from 'react';

const ImageCarousel = () => {
    const images = [
        "https://framerusercontent.com/images/2koH1q2uCuIEgN4VSawQEIyl0.png",
        "https://framerusercontent.com/images/RZsAPAPpaOTIO1wkXullvG4k5o.png",
        "https://framerusercontent.com/images/xKqbZBFzF8LCsHJ1I5QJ8QgqJw.png",
        "https://framerusercontent.com/images/mydOzETkddl1FMgYWhgBzIGEc.png",
        "https://framerusercontent.com/images/rdOaWLeE3eEcX3adKpHtMYOhB4.png",
        "https://framerusercontent.com/images/XviNwoJtGSVacMiynjY64p7Bqo.png"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const next = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth * newIndex;
    };

    const prev = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth * newIndex;
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth * index;
    };

    const handleScroll = () => {
        const scrollLeft = carouselRef.current.scrollLeft;
        const slideWidth = carouselRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / slideWidth);
        setCurrentIndex(newIndex);
    };

    return (
        <div className="w-full px-4">
            <div className="relative overflow-hidden rounded-[20px]">
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
                    style={{ scrollBehavior: 'smooth' }}
                    onScroll={handleScroll}
                >
                    {images.map((src, index) => (
                        <div key={index} className="flex-shrink-0 w-full snap-center">
                            <img
                                src={src}
                                alt={`Carousel image ${index + 1}`}
                                className="w-full h-64 object-cover rounded-[20px]"
                            />
                        </div>
                    ))}
                </div>
                {currentIndex > 0 && (
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-white"
                    >
                        ←
                    </button>
                )}
                {currentIndex < images.length - 1 && (
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-white"
                    >
                        →
                    </button>
                )}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-opacity ${
                                index === currentIndex ? 'bg-white opacity-100' : 'bg-white opacity-50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;