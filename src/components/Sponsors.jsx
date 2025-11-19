const Sponsors = () => {
    const images = [
        "https://framerusercontent.com/images/2IVnfMmemYzpzKhMzeKpS7q2s.png",
        "https://framerusercontent.com/images/hRn44hAZLgic6f4NjgTjwgbCCXU.png",
        "https://framerusercontent.com/images/31oKlRs5i2HobHh4LJKD1tOkElk.png",
        "https://framerusercontent.com/images/V5RBKoVC3tQqNvzpdRlqnI5KVo.png",
        "https://framerusercontent.com/images/OV98n2Wp0k8GzaLq0NZaD6AGBSI.png",
        "https://framerusercontent.com/images/bgEzD6SFCcpeWN0K4qqMrcV5w.png",
        "https://framerusercontent.com/images/mtr7a9IM4JOGdIGT4iiSLJbWJAI.png"
    ];

    return (
        <div className="w-full px-4">
            <div className="text-center mb-6">
                <p className="text-[#c2ef10] text-lg">Untrusted by</p>
            </div>

            <div className="relative overflow-hidden">
                <div className="flex">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-4 animate-infinite-scroll">
                            {images.map((src, index) => (
                                <div key={`${i}-${index}`} className="flex-shrink-0 w-40 h-10">
                                    <img src={src} alt="Sponsor" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sponsors;