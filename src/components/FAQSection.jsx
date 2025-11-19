import React, {useState} from 'react';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqItems = [{
        question: "What is WallStreetBets Live?",
        answer: "Not a conference. A three-day chaos lab where traders, builders, and meme lords collide. Think alpha drops, culture shocks, and a crowd that actually moves markets."
    }, {
        question: "When and where is it?",
        answer: "Jan 28 to 30, 2026. Miami Beach Convention Center, Grand Ballroom. Sunshine, chaos, gains."
    }, {
        question: "Who's it for?",
        answer: "Degens with taste. Traders, creators, memers, lurkers. If you crave signal over suits, this is your floor."
    }, {
        question: "What should I expect?",
        answer: "Smart chaos. No gatekeepers. Drops, talks, network plays, late-night antics. Less panels, more profits."
    }];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (<div
        className="w-full bg-white rounded-[20px] flex flex-col items-center justify-start gap-[50px] px-6 py-6 md:px-[27px] md:py-[30px] md:w-[832px] md:flex-row md:flex-wrap">
        <div className="bg-[#191919] rounded-[5px] px-4 py-2 w-full md:w-auto">
            <h3 className="text-white text-sm font-medium text-center md:text-base">
                Wall Street Bets Live — FAQ
            </h3>
        </div>

        <div className="w-full space-y-0">
            {faqItems.map((item, index) => (<div key={index} className="border-t border-gray-300 first:border-t-0">
                <div
                    className="flex justify-between items-center py-4 cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                >
                    <p className="text-black font-medium text-sm md:text-base">
                        {item.question}
                    </p>
                    <svg
                        className={`w-5 h-5 text-black md:w-6 md:h-6 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </div>
                {openIndex === index && (<div className="pb-4">
                    <p className="text-gray-600 text-sm md:text-base">
                        {item.answer}
                    </p>
                </div>)}
            </div>))}
        </div>

        <div className="w-full">
            <button
                className="w-full border-2 border-gray-600 rounded-full py-3 px-6 bg-transparent hover:bg-gray-50 transition-colors">
                <p className="text-gray-600 font-medium text-center text-sm md:text-base">
                    Show more
                </p>
            </button>
        </div>
    </div>);
};

export default FAQSection;