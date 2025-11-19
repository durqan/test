import React from 'react';

const SpeakersSection = () => {
    const speakers = [
        { name: "Francis Suarez", role: "Mayor of Miami", image: "/img/francis-suarez.png" },
        { name: "Vitalik Buterin", role: "Ethereum", image: "/img/vitalik-buterin.png" },
        { name: "Michael Saylor", role: "MicroStrategy", image: "/img/michael-saylor.png" },
        { name: "Chengpang Zhao", role: "Binance", image: "/img/chengpang-zhao.png" },
        { name: "Paolo Ardoino", role: "Tether", image: "/img/paolo-ardoino.png" },
        { name: "Elizabeth Stark", role: "Starknet", image: "/img/elizabeth-stark.png" },
        { name: "Charles Hoskinson", role: "Cardano", image: "/img/charles-hoskinson.png" },
        { name: "Gavin Wood", role: "Polkadot", image: "/img/gavin-wood.png" },
        { name: "Yat Sui", role: "Animoca brands", image: "/img/yat-sui.png" },
        { name: "Jesse Powell", role: "Kraken", image: "/img/jesse-powell.png" },
        { name: "Andre Cronje", role: "Yearn", image: "/img/andre-cronje.png" },
        { name: "Stani Kulechov", role: "Aave", image: "/img/stani-kulechov.png" }
    ];

    return (
        <div className="w-full bg-[#191919] rounded-[20px] flex flex-col items-center gap-6 px-4 py-6">
            <div className="text-center">
                <div className="inline-flex bg-white rounded-[5px] px-4 py-2 mb-3">
                    <h3 className="text-[#191919] text-sm font-medium">
                        Past Speakers & Builders
                    </h3>
                </div>
                <h2 className="text-white text-xl font-bold leading-tight">
                    We've featured the people<br />your favorite influencers copy
                </h2>
            </div>
            <div className="w-full overflow-hidden">
                <div className="relative overflow-hidden">
                    <div className="flex animate-infinite-scroll space-x-3">
                        {[...Array(4)].map((_, cycleIndex) => (
                            <div key={cycleIndex} className="flex flex-col gap-3 flex-shrink-0">
                                {/* Два ряда в одной колонке */}
                                <div className="flex gap-3">
                                    {speakers.slice(0, 3).map((speaker, index) => (
                                        <div
                                            key={`${cycleIndex}-${index}`}
                                            className="w-[160px] bg-white/7 rounded-[20px] overflow-hidden flex-shrink-0"
                                        >
                                            <div className="aspect-[3/4]">
                                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="text-white font-semibold text-sm mb-1">{speaker.name}</h3>
                                                <p className="text-white text-xs">{speaker.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    {speakers.slice(3, 6).map((speaker, index) => (
                                        <div
                                            key={`${cycleIndex}-${index + 3}`}
                                            className="w-[160px] bg-white/7 rounded-[20px] overflow-hidden flex-shrink-0"
                                        >
                                            <div className="aspect-[3/4]">
                                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="text-white font-semibold text-sm mb-1">{speaker.name}</h3>
                                                <p className="text-white text-xs">{speaker.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-white text-sm leading-relaxed">
                    The founders, traders, and creators who made the chaos of previous year's look easy.
                </p>
            </div>
        </div>
    );
};

export default SpeakersSection;