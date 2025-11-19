const Header = () => {
    return (
        <div className="fixed top-3 left-3 right-3 z-50 bg-[#191919] rounded-3xl px-4 py-3">
            <div className="flex items-center justify-between">
                <a
                    href="./"
                    className="flex items-center">
                    <div className="w-24 h-8 relative">
                        <img
                            src="https://framerusercontent.com/images/L9b5sBUeB9SsFC9WJLvtrI1j99A.png?width=727&height=232"
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </a>
                <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white"
                    >
                        <path
                            d="M3 12H21M3 6H21M3 18H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Header;