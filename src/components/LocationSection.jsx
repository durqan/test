import React from 'react';

const LocationSection = () => {
    return (
        <div id="location" className="w-full bg-orange-custom rounded-2xl flex flex-col md:flex-row items-start justify-start gap-[30px] p-6 md:p-[30px] md:w-[832px] scroll-mt-[120px]">
            <div className="p-6 w-full">
                <div className="text-left mb-6">
                    <h2 className="text-white text-2xl font-bold mb-2">
                        An Iconic Venue<br />
                        <span className="text-black">Miami Beach Convention Center Grand Ballroom</span>
                    </h2>
                </div>

                <div className="text-black text-left space-y-4">
                    <p className="text-base">
                        Address:<br />
                        1901 Convention Center Drive, Miami Beach, Florida 33139.
                    </p>
                    <p className="text-base">
                        Date:<br />
                        28–30 January 2026
                    </p>
                </div>
            </div>
            <div className="w-full h-px bg-black" />
            <div className="rounded-lg overflow-hidden w-full">
                <img
                    decoding="auto"
                    src="https://framerusercontent.com/images/YR1r6BiYNwNH8ZHpMsWljp85T8.png?width=1288&height=1088"
                    alt="Miami Beach Convention Center"
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
};

export default LocationSection;