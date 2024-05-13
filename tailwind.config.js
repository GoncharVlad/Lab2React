/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firstBodyGradientCol': "#8a53b6",
        'secondBodyGradientCol': "#cea2d0",
        'gridTextCol': "#8e5b5b",
        'statsTextColor': "#808080",
        'firstCardGradientCol': "#57b5f9",
        'secondCardGradientCol': "#da11ba",
        'controlsBorderCol': "#ccc",
        'manualPaymentCol': "#e85e5b",
        'dividingCol': "#767676"
      },
      backgroundImage: {
        'avatar': "url(\"https://avatars.githubusercontent.com/u/95451374?v=4\")"
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        lg: '16px'
      }
    },
  },
  plugins: [],
}
