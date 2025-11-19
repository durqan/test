const Speakers = () => {
    const speakers = [
        { name: "Martin Shkreli", company: "Turing Pharmaceuticals", image: "https://framerusercontent.com/images/Gg3476EQl6TcZRaUXpDTvODJR4.png" },
        { name: "Jaime Rogozinski", company: "WallStreetBets", image: "https://framerusercontent.com/images/fxlHy357SKhaRXO00kyfuVg6Xg.png" },
        { name: "Jordan Belfort", company: "The Wolf of Wall Street", image: "https://framerusercontent.com/images/OfXo0nL70DhI1VyFNFPiuPC4.png" },
        { name: "Yoni Assia", company: "eToro", image: "https://framerusercontent.com/images/qGFwR8wYyCyyvUWD4FG7f7nXfQ.png" },
        { name: "scott melker", company: "The Wolf of All Streets", image: "https://framerusercontent.com/images/1rIv1CAkP9PHzetUiaWH3mNl0Y.png" },
        { name: "Anthony Scaramucci", company: "SkyBridge Capital", image: "https://framerusercontent.com/images/scpQ1DlH19t3DGuxhygr5MP2fVY.png" },
        { name: "Matthew Roszak", company: "Bloq", image: "https://framerusercontent.com/images/T2R5WPM3kv3Okl9lQfmDXOJ4lkU.png" },
        { name: "Enzo Villani", company: "AlphaTON Capital", image: "https://framerusercontent.com/images/3FZWq8jAn2cQykcyWBuPHhmJk.png" },
        { name: "Brittany Kaiser", company: "AlphaTON Capital", image: "https://framerusercontent.com/images/jR0jcQBjUFeq7oAT98YjxlLGc.png" },
        { name: "Paola Origel", company: "Hyla Fund Management", image: "https://framerusercontent.com/images/Oh1V0nC973NaX2mTwNN9oyxXI.png" },
        { name: "Nate Popper", company: "Bloomberg News", image: "https://framerusercontent.com/images/fA7Q26OTZqS7XeI8kj8ay4vnwak.png" },
        { name: "brock pierce", company: "Bitcoin Foundation", image: "https://framerusercontent.com/images/Zlt9RjEMLDeao2Lmx1SZfeiLe8.png" },
        { name: "Jacques Rogozinski", company: "Nacional Financiera (NAFINSA)", image: "https://framerusercontent.com/images/njOEf6NrfHc2X3Dp7PlaQWhUphw.png" },
        { name: "Alex Tapscott", company: "CMCC Capital Markets", image: "https://framerusercontent.com/images/5bcniIbEskOaw2SHd9ujB5OkijU.png" },
        { name: "Dan Held", company: "Asymmetric", image: "https://framerusercontent.com/images/2vAL4XAuwTTqdzFB1hcBMxAuxc4.png" },
        { name: "Jenna Pilgrim", company: "CoinFund", image: "https://framerusercontent.com/images/BedBi688h0PcqJGiMB170UpL4jU.png" },
        { name: "Bobby Beniers", company: "CoinFund", image: "https://framerusercontent.com/images/Q12ITGbbjYLm5DAyyRko7dWF94.png" },
        { name: "Charlie Shrem", company: "Bitcoin Foundation", image: "https://framerusercontent.com/images/pJrWATk6TfKBwliDLo2jMmBH7M.png" },
        { name: "Maja Vujinović", company: "FG Nexus", image: "https://framerusercontent.com/images/6Jx8In1mk7BH5O9DsIIal1g.png" },
        { name: "Jaime Leverton", company: "ReserveOne", image: "https://framerusercontent.com/images/3wYGgFPXLA6TNR7oqoBEyOm45PA.png" }
    ];

    return (
        <div className="w-full px-4 space-y-8 border border-white rounded-[20px] p-6">
            <div className="space-y-4">
                <div className="bg-white rounded px-4 py-2 w-fit">
                    <h3 className="text-[#191919] text-lg font-bold">Speakers & Builders</h3>
                </div>
                <h2 className="text-white text-3xl font-bold">
                    Featuring the people your favorite influencers copy
                </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {speakers.map((speaker, index) => (
                    <div key={index} className="space-y-2">
                        <div className="w-full h-40 rounded-lg overflow-hidden">
                            <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-white text-sm font-bold">{speaker.name}</h3>
                            <p className="text-white text-xs">{speaker.company}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <div className="w-full h-px bg-white" />
                <p className="text-white text-right text-base">
                    The founders, traders, and creators who made the chaos of previous year's look easy.
                </p>
            </div>
        </div>
    );
};

export default Speakers;