// Пример данных для страницы преподавателей
export const fakeTeachers = [
  {
    id: 1,
    name: "Иванова А.А.",
    position: "Профессор",
    bio: "Специалист в области ...",
    avatar: "/avatars/1.jpg",
  },
  {
    id: 2,
    name: "Сперанский М.М.",
    position: "Старший преподаватель",
    bio: "Специалист в области ...",
    avatar: "/avatars/1.jpg",
  },
  {
    id: 3,
    name: "Иглина Е.А.",
    position: "Доцент",
    bio: "Специалист в области ...",
    avatar: "/avatars/1.jpg",
  },
];

// Данные для галереи
export const fakeGallery = [
  {
    id: 1,
    title: "Наши проекты",
    items: [
      { id: 1, image: "/gallery/1.jpg", description: "3D-модель кампуса" },
    ],
  },
];

export const fetchTeachers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeTeachers), 500); // Имитация задержки
  });
};

export const fetchGallery = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeGallery), 500);
  });
};
