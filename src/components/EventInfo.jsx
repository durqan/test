const EventInfo = () => {
    return (
        <>
            <div className="w-[calc(100%-32px)] bg-white rounded-[20px] flex flex-col items-start gap-8 p-8 ml-4 mt-4">
                <div className="w-full">
                    <h1 className="text-custom-hero font-anton uppercase text-orange-custom tracking-[-0.01em] leading-[98%] break-words">
                        WallStreetBets Live: <span className="text-black">Where Degens meet Davos</span>
                    </h1>
                </div>

                <div className="space-y-4 text-right w-full">
                    <p className="text-left text-orange-custom leading-relaxed">
                        28–30 January 2026<br />
                        Miami Beach Convention Center<br />
                        Grand Ballroom
                    </p>
                    <p className="text-base leading-relaxed">
                        Builders. Traders. Memers.<br />
                        All in the same room.<br />
                        It's gonna be glorious.
                    </p>
                </div>

                <div className="w-full h-px bg-black" />

                <div className="w-full space-y-4">
                    <button className="w-full border-2 border-orange-custom rounded-full py-4 px-6 text-orange-custom text-xs uppercase font-anton font-bold">
                        Become a sponsor
                    </button>
                    <div className="flex justify-center">
                        <a
                            href="https://luma.com/event/evt-OzAprNZGBy8oajY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-48 bg-orange-custom text-white rounded-full py-4 px-8 text-center text-xs uppercase font-anton font-bold"
                        >
                            BUY TICKETS
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full px-4 pt-4">
                <video
                    src="/video/event.mp4"
                    loop
                    autoPlay
                    preload="auto"
                    controls
                    muted
                    playsInline
                    className="w-full h-auto rounded-[20px] object-cover"
                />
            </div>
        </>
    );
};

export default EventInfo;