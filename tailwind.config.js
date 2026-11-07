// Tailwind config: class-based dark mode + brand colors from the design video
export default { darkMode: 'class', content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: { extend: { colors: { brand: { DEFAULT:'#0b4a2a', light:'#e8f3ec' }, accent:'#f26b0f', star:'#16c60c', soft:'#f6f6f6' },
    fontFamily: { en:['Inter','sans-serif'], ar:['Cairo','Tajawal','sans-serif'] } } } }
