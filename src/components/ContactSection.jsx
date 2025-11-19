import React from 'react';

const ContactSection = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full bg-orange-custom rounded-[28px] flex flex-col items-center justify-start h-auto min-h-[640px] p-8 overflow-hidden">
            <div className="w-full mb-6 overflow-hidden">
                <video
                    src="/video/heroor.mp4"
                    loop
                    preload="auto"
                    muted
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover bg-transparent"
                    style={{transform: 'scale(1.1)'}}
                />
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-4 px-6">
                <label className="block">
                    <input
                        type="text"
                        required
                        name="Name"
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-orange-custom text-white placeholder-white"
                    />
                </label>
                <label className="block">
                    <input
                        type="email"
                        required
                        name="Email"
                        placeholder="Your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-orange-custom text-white placeholder-white"
                    />
                </label>
                <label className="block">
                    <textarea
                        name="Comments"
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-orange-custom text-white placeholder-white resize-none"
                    />
                </label>
                <label className="flex items-start space-x-3 pt-4">
                    <input
                        className="mt-1 w-4 h-4"
                        required
                        type="checkbox"
                        name="Privice check"
                    />
                    <div className="text-white text-sm">
                        <p>
                            I agree to the{' '}
                            <a className="text-black underline decoration-black" href="./privacy-policy">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </label>
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-white text-orange-custom rounded-full py-4 px-6 font-medium hover:bg-gray-100 transition-colors"
                    >
                        Get in touch
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactSection;