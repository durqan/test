const FinalModule = () => {
    return (
        <div className="w-full bg-[#191919] rounded-[20px] flex flex-col md:flex-row items-start justify-start gap-8 p-8">
            <div className="flex-1 space-y-4">
                <h2 className="text-orange-custom text-3xl font-bold">
                    Built for the bold
                </h2>
                <p className="text-white text-base text-left">
                    Retail traders. Creators. Builders. Meme magicians.<br />
                    If you've ever yelled "send it" at your screen — you're one of us.
                </p>
            </div>
            <div className="w-full h-px bg-white"/>
            <div className="flex-1">
                <h1 className="text-custom-hero font-anton uppercase text-orange-custom tracking-tightest leading-[0.8] font-black text-right">
                    Let's build something <span className="text-white">worth</span><br />
                    aping into
                </h1>
            </div>
        </div>
    );
};

export default FinalModule;