import React from 'react';

const ApeInSection = () => {
    return (
        <div className="w-full bg-white rounded-2xl py-8 px-4">
            <div className="text-center mb-6">
                <p className="font-['Anton_SC'] text-[68px] leading-[82%] tracking-[-0.01em] uppercase text-center">
                    ape in <span className="text-orange-custom">now</span>
                </p>
            </div>

            <div className="text-center space-y-6">
                <div className="mb-4">
                    <p className="text-black text-center text-base">
                        Buy now to get first dibs on drops, and the weird stuff we haven't announced yet.
                    </p>
                </div>

                <div className="w-full max-w-[780px] mx-auto">
                    <svg viewBox="0 0 780 4" className="w-full h-1 text-black">
                        <line x1="0" y1="2" x2="780" y2="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <div className="w-full max-w-[300px] mx-auto">
                    <a
                        href="https://luma.com/event/evt-OzAprNZGBy8oajY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-[14px] px-5 bg-orange-custom text-white rounded-[32px] text-xs uppercase tracking-[0.5px] font-['Special_Gothic_Expanded_One'] leading-[1.2] w-full hover:bg-orange-600 transition-colors"
                    >
                        BUY TICKETS
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ApeInSection;