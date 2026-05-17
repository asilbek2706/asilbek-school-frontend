import type { Course } from "@/entities/course/model/types";

export const courses: Course[] = [
  {
    id: 1,
    title: "HTML ASOSLARI",
    description: "Veb-sahifalarning karkasi va semantik tuzilishini o'rganing.",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174854.png",
    lessons: [
      { 
        id: 101, 
        title: "HTML Strukturasi", 
        duration: "05:20",
        description: "Har bir HTML hujjati <!DOCTYPE html> bilan boshlanishi shart. Bu brauzerga hujjat turini bildiradi.",
        codeSnippet: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Mening Sahifam</title>\n</head>\n<body>\n  <h1>Salom Dunyo!</h1>\n</body>\n</html>`
      },
      { 
        id: 102, 
        title: "Semantik Taglar", 
        duration: "12:45",
        description: "header, footer, main, va section taglari veb-sahifaning ma'nosini brauzer va qidiruv tizimlariga tushuntiradi.",
        codeSnippet: `<header>\n  <nav>Menyu</nav>\n</header>\n<main>\n  <article>Maqola mazmuni...</article>\n</main>`
      },
      { 
        id: 103, 
        title: "Semantik Taglar", 
        duration: "12:45",
        description: "header, footer, main, va section taglari veb-sahifaning ma'nosini brauzer va qidiruv tizimlariga tushuntiradi.",
        codeSnippet: `<header>\n  <nav>Menyu</nav>\n</header>\n<main>\n  <article>Maqola mazmuni...</article>\n</main>`
      },{ 
        id: 104, 
        title: "Semantik Taglar", 
        duration: "12:45",
        description: [
          "header, footer, main, va section taglari veb-sahifaning ma'nosini brauzer va qidiruv tizimlariga tushuntiradi.",
          "Semantik taglar SEO va accessibility uchun muhim hisoblanadi.",
          "Har bir bo'limga mos tag ishlatish kodni tushunarli qiladi."
        ],
        codeSnippet: `<header>\n  <nav>Menyu</nav>\n</header>\n<main>\n  <article>Maqola mazmuni...</article>\n</main>`
      },{ 
        id: 105, 
        title: "Semantik Taglar", 
        duration: "12:45",
        description: "header, footer, main, va section taglari veb-sahifaning ma'nosini brauzer va qidiruv tizimlariga tushuntiradi.",
        codeSnippet: `<header>\n  <nav>Menyu</nav>\n</header>\n<main>\n  <article>Maqola mazmuni...</article>\n</main>`
      },{ 
        id: 106, 
        title: "Semantik Taglar", 
        duration: "12:45",
        description: "header, footer, main, va section taglari veb-sahifaning ma'nosini brauzer va qidiruv tizimlariga tushuntiradi.",
        codeSnippet: `<header>\n  <nav>Menyu</nav>\n</header>\n<main>\n  <article>Maqola mazmuni...</article>\n</main>`
      },
    ],
  },
  {
    id: 2,
    title: "MODERN CSS",
    description: "Flexbox, Grid va zamonaviy dizayn uslublari.",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    lessons: [
      { 
        id: 201, 
        title: "Flexbox Layout", 
        duration: "15:00",
        description: "Flexbox orqali elementlarni gorizontal va vertikal tekislash juda oson.",
        codeSnippet: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}`
      },
      { 
        id: 202, 
        title: "CSS Grid", 
        duration: "20:30",
        description: "Murakkab 2D maketlar yaratish uchun eng kuchli vosita.",
        codeSnippet: `.grid-wrapper {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}`
      }
    ],
  },
  {
    id: 3,
    title: "JAVASCRIPT ES6+",
    description: "Dinamik dasturlash va DOM bilan ishlash asoslari.",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/596829.png",
    lessons: [
      { 
        id: 301, 
        title: "Arrow Functions", 
        duration: "10:00",
        description: "ES6 dagi qisqa funksiya yozish usuli va uning 'this' bilan ishlashi.",
        codeSnippet: `const sayHello = (name) => {\n  console.log(\`Salom, \${name}!\`);\n};\n\nsayHello('Asilbek');`
      }
    ],
  },
  {
    id: 4,
    title: "REACT.JS",
    description: "Komponentlar, Hooklar va Virtual DOM.",
    icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    lessons: [
      { 
        id: 401, 
        title: "useState Hook", 
        duration: "18:20",
        description: "Reactda holatni (state) boshqarishning eng sodda usuli.",
        codeSnippet: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Sanoq: {count}\n    </button>\n  );\n}`
      }
    ],
  },
  {
    id: 5,
    title: "NEXT.JS 15",
    description: "Server Components va App Router tizimi.",
    icon: "https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-11y9unat.png",
    lessons: [
      { 
        id: 501, 
        title: "Routing Tizimi", 
        duration: "22:00",
        description: "Next.js da papkalar asosida marshrutlash qanday ishlaydi.",
        codeSnippet: `// app/page.tsx\nexport default function Home() {\n  return <h1>Xush kelibsiz Next.js ga!</h1>;\n}`
      }
    ],
  },
  {
    id: 6,
    title: "TAILWIND CSS",
    description: "Utility-first framework bilan tezkor dizayn.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    lessons: [
      { 
        id: 601, 
        title: "Responsive Design", 
        duration: "14:10",
        description: "Tailwindda breakpointlar (sm, md, lg) yordamida moslashuvchan dizayn qilish.",
        codeSnippet: `<div className="p-4 md:p-10 lg:p-20 bg-blue-500 text-white">\n  Moslashuvchan blok\n</div>`
      }
    ],
  },
  {
    id: 7,
    title: "TYPESCRIPT",
    description: "Static typing va xavfsiz kod yozish madaniyati.",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/596838.png",
    lessons: [
      { 
        id: 701, 
        title: "Interface vs Type", 
        duration: "11:45",
        description: "TypeScriptda obyektlar uchun turlarni belgilash farqlari.",
        codeSnippet: `interface User {\n  id: number;\n  name: string;\n}\n\nconst user: User = { id: 1, name: 'Gemini' };`
      }
    ],
  },
  {
    id: 8,
    title: "VUE.JS 3",
    description: "Composition API va Vue ekotizimi.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    lessons: [
      { 
        id: 801, 
        title: "Ref va Reactive", 
        duration: "16:30",
        description: "Vue 3 da reaktivlikni boshqarish asoslari.",
        codeSnippet: `<script setup>\nimport { ref } from 'vue';\nconst message = ref('Salom Vue!');\n</script>\n\n<template>\n  <h1>{{ message }}</h1>\n</template>`
      }
    ],
  }
];