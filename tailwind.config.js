/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // These are for the operational status
    // 'bg-green-50',
    // 'bg-red-50',
    // 'bg-gray-100',
    //
    // This is for the logo
    'fill-brand-light',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        brand: {
          blue: '#0788ff',
          indigo: '#6610f2',
          purple: '#6f42c1',
          pink: '#d63384',
          red: '#dc3545',
          orange: '#fd7e14',
          yellow: '#ffc107',
          green: '#37a806',
          teal: '#20c997',
          cyan: '#0dcaf0',
          white: '#fcfcfc',
          gray: '#6e6e6e',
          'gray-dark': '#343a40',
          primary: '#6933ff',
          secondary: '#6e6e6e',
          success: '#37a806',
          info: '#0dcaf0',
          warning: '#ffc107',
          danger: '#dc3545',
          light: '#f8f9fa',
          dark: '#212529',
          black: '#000',
          'electric-purple': '#6933ff',
          'deep-purple': '#190f33',
          'dark-blue': '#0037a5',
          'cloud-blue': '#0788ff',
          'iridescent-blue': '#00fced',
          'gray-f4': '#f4f4f4',
          'neutral-400': '#c0c6d9',
          'bright-turquoise': '#1bf8ec',
          'cerebral-grey': '#ccc',
          'starfleet-blue': '#0496ff',
          'gray-b': '#bebbce',
          'white-smoke': '#f5f5f5',
          'hidden-sapphire': '#475872',
          'narwhal-grey': '#060c12',
          'evening-hush': '#7e89a9',
          'chaos-black': '#101010',
          'not-tonight': '#0b0717',
          'ocean-green': '#033457',
          'ocean-border': '#00538f',
          'neutral-100': '#dee4fa',
        },
      },
      fontSize: {
        xxs: '0.6rem',
      },
      gridTemplateColumns: {
        ['auto-auto']: 'auto auto',
        ['auto-1fr']: 'auto 1fr',
        ['1fr-auto']: '1fr auto',
        ['1fr-1fr']: '1fr 1fr',
      },
      keyframes: {
        float: {
          '0%': { opacity: '0%', transform: 'translateY(0px)' },
          '50%': { opacity: '100%' },
          '100%': { opacity: '0%', transform: 'translateY(-400px)' },
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
