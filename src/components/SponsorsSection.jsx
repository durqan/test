import React from 'react';

const SponsorsSection = () => {
    const sponsors = {
        platinum: [
            { name: "Alphaton Capital", logo: "https://framerusercontent.com/images/CX8lVvZLgStfVVhgJ2SSc4DJ4Ok.png", url: "https://alphatoncapital.com" },
            { name: "Hemi", logo: "https://framerusercontent.com/images/ZaB6OtvzXfBnEngffD5XtsmdOWY.png", url: "https://hemi.xyz" }
        ],
        gold: [
            { name: "Staicy AI", logo: "https://framerusercontent.com/images/e7lrz7H65FtxgAO51kzLYkMV4oo.png", url: "https://staicy.ai" },
            { name: "Altcoinist", logo: "https://framerusercontent.com/images/O9RncXW6mOCJhXWzES51UuNo2Ec.png", url: "https://www.altcoinist.com" },
            { name: "Odyssey Finance", logo: "https://framerusercontent.com/images/b5GuIEYQk8pJJ6vJ3gidNLVsvH4.png", url: "https://odyssey.finance/" },
            { name: "Metronome", logo: "https://framerusercontent.com/images/BIn653w2Td8qTOHxU5CNH5aZtQ8.png", url: "https://metronome.io/" },
            { name: "Hyperchain Capital", logo: "https://framerusercontent.com/images/sUuypaGZHFiN61OMK4t7ynGBZs.png", url: "https://www.hyperchain.capital/" }
        ],
        silver: [
            { name: "Stake", logo: "https://framerusercontent.com/images/hDNqeivCKpRocKAOBI00P5ilk.png", url: "https://stake.us/" },
            { name: "Luma", logo: "https://framerusercontent.com/images/5QxxlwT2mBE98sKKZvBL29ZDFfA.png", url: "https://luma.com/" },
            { name: "Monero", logo: "https://framerusercontent.com/images/Evi769YHiP6Cjidn3F59M7FYwE.png", url: "https://www.getmonero.org/" }
        ],
        media: [
            { name: "Media Partner 1", logo: "https://framerusercontent.com/images/xSNVrVuQF2A2KLjz0zLtE68DIf8.png" },
            { name: "Media Partner 2", logo: "https://framerusercontent.com/images/wDYAHhX0PacMmYIwulnADYKlA.png" },
            { name: "Media Partner 3", logo: "https://framerusercontent.com/images/GA342FoRNhGkADi7ucVl84Fok.png" }
        ]
    };

    return (
        <div
            id="sponsors"
            className="w-full bg-[#191919] rounded-[20px] flex flex-col items-start gap-0 px-0 py-0 overflow-visible relative"
            style={{ scrollMarginTop: '120px' }}
        >
            <div className="w-full px-4 py-6">
                <div className="text-center">
                    <div className="inline-flex bg-white rounded-[5px] px-4 py-2 mb-4">
                        <h3 className="text-[#191919] text-sm font-medium">Sponsors</h3>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight">
                        Backed by the brands your feed can't stop talking about
                    </h2>
                </div>
            </div>
            <div className="flex flex-col items-center gap-0 w-full min-h-0 overflow-visible relative bg-[#ff4600] pt-8 px-6 pb-6">
                <div className="mb-4">
                    <h3 className="font-anton text-black text-2xl uppercase">
                        Platinum Sponsors
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {sponsors.platinum.map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#191919] rounded-[20px] p-6 block border border-[#bebebe] border-opacity-50"
                            style={{ borderWidth: '0.5px' }}
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="w-full h-8 object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full px-4 py-6 border-t border-[#bebebe] border-opacity-50">
                <div className="mb-4">
                    <h3 className="font-anton text-white text-center text-2xl uppercase">
                        GOLD SPONSORS
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {sponsors.gold.map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-[#191919] rounded-[20px] p-4 block border border-[#bebebe] border-opacity-50 ${sponsors.gold.length % 2 !== 0 && index === sponsors.gold.length - 1 ? 'col-span-2 justify-self-center w-1/2' : ''}`}
                            style={{ borderWidth: '0.5px' }}
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="w-full h-6 object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full px-4 py-6 border-t bg-[#bebebe] border-opacity-50">
                <div className="mb-4">
                    <h3 className="font-anton text-black text-center text-2xl uppercase">
                        Silver Sponsors
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {sponsors.silver.map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#191919] rounded-[20px] p-4 block border border-[#bebebe] border-opacity-50"
                            style={{ borderWidth: '0.5px' }}
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="w-full h-6 object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full px-4 py-6 border-t border-[#bebebe] border-opacity-50">
                <div className="mb-4">
                    <h3 className="font-anton text-[#bebebe] text-center text-2xl uppercase">
                        Media Partners
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {sponsors.media.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-black rounded-[20px] p-4 border border-[#bebebe] border-opacity-50"
                            style={{ borderWidth: '0.5px' }}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="w-full h-6 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full px-4 py-6">
                <div className="text-center">
                    <h2 className="text-orange-custom text-xl font-bold mb-4">
                        Partner with the movement
                    </h2>
                    <div className="w-full h-px bg-white my-4"></div>
                    <p className="text-orange-custom text-sm mb-6">
                        This isn't a conference. It's a crowd. They're not here for banners — they're here for value, integration, and culture. So bring something worth being memed.
                    </p>
                    <button className="bg-[#ff4600] text-white rounded-full px-8 py-3 font-medium w-full max-w-xs mx-auto border-0">
                        Become a sponsor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SponsorsSection;