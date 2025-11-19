module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'infinite-scroll': 'infinite-scroll 8s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            colors: {
                'orange-custom': 'rgb(255,84,0)',
                'orange-dark': '#F54100',
                'custom-black': '#191919',
                'custom-white': '#fff',
                'custom-gray': '#bebebe',
            },
            backgroundColor: {
                'white/7': 'rgba(255, 255, 255, 0.07)',
                'white/10': 'rgba(255, 255, 255, 0.1)',
                'white/30': 'rgba(255, 255, 255, 0.3)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            borderColor: {
                'white/20': 'rgba(255, 255, 255, 0.2)',
            },
            borderRadius: {
                '5': '5px',
                '20': '20px',
                '24': '24px',
            },
            aspectRatio: {
                '776/856': '776 / 856',
            },
            fontFamily: {
                'anton': ['Anton SC', 'sans-serif'],
                'arial': ['Arial', 'Arial Placeholder', 'sans-serif'],
            },
            fontSize: {
                'custom-hero': '38.72px',
            },
            spacing: {
                '18': '4.5rem',
                '30': '30px',
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}
