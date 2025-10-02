module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- Add this line
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'mlg' : '1150px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}