const StatsModule = () => {
    const cards = [
        { number: "750+", text: "Top ranked speakers\nand experts", textColor: "text-white", bgColor: "bg-transparent"},
        { number: "600+", text: "Exhibitors, partners\nand media outlets", textColor: "text-[#191919]", bgColor: "bg-white"},
        { number: "40,000+", text: "Global attendees", textColor: "text-[#191919]", bgColor: "bg-[#ffccb9]"},
        { number: "11,000+", text: "Companies, institutions\nand governments", textColor: "text-[#191919]", bgColor: "bg-[#ffa27f]"},
        { number: "$568b", text: "Market Cap of launched projects\nfrom our stages", textColor: "text-[#191919]", bgColor: "bg-[#ff6d36]"},
        { number: "$764m", text: "Investments made from conference\nconnections", textColor: "text-[#191919]", bgColor: "bg-[#ff4600]"}
    ];

    return (
        <div className="w-full px-4 space-y-8 border border-white rounded-[20px] p-6">
            <div className="space-y-4">
                <h1 className="text-custom-hero font-anton uppercase text-white tracking-tighter leading-none font-black">
                    <span className="text-orange-custom">Brought to you</span> by the team behind wagmi and the north american bitcoin conference
                </h1>
                <p className="text-white text-base text-left">
                    We hold the laurels for not only starting the first crypto conference in the world but also the longest-running.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {cards.map((card, index) => (
                    <div key={index} className={`${card.bgColor} rounded-lg p-4 space-y-3`}>
                        <h1 className={`${card.textColor} text-2xl font-anton uppercase tracking-tighter leading-none font-black`}>{card.number}</h1>
                        <div className={`w-1/3 h-px ${index === 0 ? 'bg-white' : 'bg-black'} ml-auto`} />
                        <p className={`${card.textColor} text-xs text-right whitespace-pre-line`}>
                            {card.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsModule;