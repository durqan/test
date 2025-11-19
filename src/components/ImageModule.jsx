const ImageModule = () => {
    return (
        <div className="w-full bg-orange-custom rounded-[20px] flex flex-col items-center gap-6 p-6">
            <div className="w-full">
                <img
                    src="/img/face-left.webp"
                    alt=""
                    className="w-48 h-48 mx-auto object-cover"
                />
            </div>
            <p className="text-black text-center w-full text-base">
                Something big is coming, and like any good entry, timing is everything.
            </p>
            <div className="text-5xl font-bold font-anton text-[#191919] w-full text-center whitespace-nowrap tracking-tighter">
                75<span className="text-[#191919]">d</span> 03<span className="text-[#191919]">h</span> 16<span
                className="text-[#191919]">m</span> 28<span className="text-[#191919]">s</span>
            </div>
            <div className="space-y-4 w-full">
                <div className="flex items-center justify-center gap-3">
                    <div className="bg-black px-4 py-2 rounded">
                        <p className="text-white text-sm">2.5 Million</p>
                    </div>
                    <p className="text-black text-base">members,</p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <div className="bg-black px-4 py-2 rounded">
                        <p className="text-white text-sm">5,000</p>
                    </div>
                    <p className="text-black text-base">tickets, you do the math.</p>
                </div>
            </div>
            <div className="w-full">
                <img
                    src="/img/face-right.webp"
                    alt=""
                    className="w-48 h-48 mx-auto object-contain"
                />
            </div>
        </div>
    );
};

export default ImageModule;