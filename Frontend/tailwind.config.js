/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-in-out",
      },
      // Extend with custom text-shadow utilities
      boxShadow: {
        // Add more custom shadows as needed
        glow: '0 0 10px rgba(0, 255, 0, 0.8)', // Example glow shadow
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        glow: '0 0 10px rgba(0, 255, 0, 0.8)', // Green glow example
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 10px rgba(0, 255, 0, 0.8)', // Example glow
        }
      }, ['responsive', 'hover', 'focus']);
    }
  ],
};
