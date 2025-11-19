const SoapOperaModule = () => {
    return (
        <div className="w-full bg-white rounded-[20px] flex flex-col md:flex-row items-center justify-start gap-8 p-6">
            <div className="flex-1 space-y-6">
                <div className="space-y-2 relative">
                    <h1 className="text-custom-hero uppercase tracking-tightest leading-[0.8] font-black">
                        <span className="text-orange-custom">The internet's</span><br />
                        <span className="text-orange-custom">favorite financial</span><br />
                        <span className="text-orange-custom">soap opera.</span><br />
                        <span className="text-black">Live and in person.</span>
                    </h1>
                    <div className="absolute top-[8rem]">
                        <img
                            src="/img/face-right.webp"
                            alt=""
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
                <div className="pt-60">
                    <h3 className="text-gray-400 text-xs font-bold uppercase text-right mt-22">
                        No gatekeepers. No gurus.<br />
                        Live drops, not endless decks.<br />
                        Alpha shared, not sold.
                    </h3><br/>
                    <div className="w-full h-px bg-gray-300 md:hidden" /><br/>
                    <div className="space-y-4">
                        <p className="text-black text-base">
                            This isn't some polished panel parade. It's what happens when internet legends, terminal junkies, shitposters, and actual builders share a stage.
                        </p>
                        <p className="text-black text-base">
                            Strategies dropped.<br />
                            Bags pumped.<br />
                            Memes minted.
                        </p>
                        <p className="text-orange-custom text-base text-right">
                            Smart chaos.<br />
                            No apologies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoapOperaModule;