const BenefitsModule = () => {
    const cards = [
        {
            image: "/img/1uEK6aOWbI49zRyAsfinVIkxa8s.png",
            title: "Live\ndrops",
            text: "Product launches, collabs, and surprise airdrops"
        },
        {
            image: "/img/S4Pyqn3yFs18grpovykWR67gHKM.png",
            title: "Signal\nsessions",
            text: "Sharp minds,\nsmarter markets,\nzero fluff"
        },
        {
            image: "/img/AqTKbGsUnI2V9kRpYgczGYkZ3c0.png",
            title: "Builder\nlabs",
            text: "Ship, test,\nand stack bags"
        },
        {
            image: "/img/FGRi67CJW3K62nex3DEgJawDNvU.png",
            title: "After-hours\nchaos",
            text: "Miami-style"
        }
    ];

    return (
        <div className="w-full bg-orange-custom rounded-[20px] flex flex-col items-center gap-8 p-6">
            <div className="space-y-4 text-center">
                <div className="bg-[#191919] rounded px-4 py-2 w-fit mx-auto">
                    <h3 className="text-white text-lg font-bold">Why You'll Show Up</h3>
                </div>
                <h2 className="text-black text-3xl font-bold">
                    What you'll actually get (besides bragging rights).
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
                {cards.map((card, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-48">
                        <img
                            src={card.image}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <h2 className="text-white text-xl font-bold whitespace-pre-line">
                                {card.title}
                            </h2>
                            <p className="text-white text-sm text-right whitespace-pre-line">
                                {card.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full h-px bg-black"/>
            <div className="text-center">
                <p className="text-black text-base">
                    We don't throw conferences. We throw catalysts.
                </p>
            </div>
        </div>
    );
};

export default BenefitsModule;