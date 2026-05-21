/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // High-Contrast Kinetic Heritage
        primary: "#00f2ff", // Electric Cyan
        secondary: "#7000ff", // Neon Purple
        tertiary: "#00ff95", // Spring Green
        accent: "#ff00e5", // Cyber Pink
        
        surface: "#020617", 
        "surface-container": "#0f172a",
        "surface-container-low": "#020617",
        "surface-container-high": "#1e293b",
        "surface-container-lowest": "#000000",
        "surface-container-highest": "#1e293b",

        "on-primary": "#000000",
        "on-secondary": "#ffffff",
        "on-surface": "#f1f5f9",
        "on-surface-variant": "#94a3b8",
        
        outline: "#334155",
        "outline-variant": "#1e293b",
        
        error: "#ff003c",
        warning: "#ffb700",
        success: "#00ff95",
      },
      boxShadow: {
        "glow-sm": "0 0 15px -5px var(--glow-color, rgba(0, 242, 255, 0.5))",
        "glow-md": "0 0 25px -2px var(--glow-color, rgba(0, 242, 255, 0.6))",
        "glow-lg": "0 0 50px 0px var(--glow-color, rgba(0, 242, 255, 0.4))",
      },
      fontFamily: {
        "headline": ["Space Grotesk"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }  
        }
      },
      animation: {
        typing: "typing 2s steps(20) 5s alternate, blink .7s infinite"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Ocultar scrollbar */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-custom': {
          /* Estilos personalizados para scrollbar */
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(51, 65, 85, 0.35)', // Se adapta al fondo oscuro del body (slate-700 con transparencia)
            borderRadius: '6px',
            border: '3px solid transparent',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#203f41',
          },
        },
      });
    },
  ],
}