// src/data.js
export const categoriesData = [
  {
    id: 1,
    name: 'Tecnología',
    forums: [
      {
        id: 1,
        name: 'React',
        threads: [
          {
            id: 1,
            title: '¿Cómo empezar con React?',
            author: 'Ana',
            date: '2025-06-01',
            messages: [
              {
                id: 1,
                author: 'Ana',
                date: '2025-06-01',
                subject: 'Inicio en React',
                content: '¿Qué recursos recomiendan para empezar con React?'
              },
              {
                id: 2,
                author: 'Luis',
                date: '2025-06-02',
                subject: 'Re: Inicio en React',
                content: 'Te recomiendo la documentación oficial y practicar con Vite.'
              }
            ]
          }
        ]
      }
    ]
  }
];
