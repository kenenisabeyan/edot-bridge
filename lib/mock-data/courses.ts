export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: { id: string; title: string; content: string }[];
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Frontend Development with React",
    description: "Learn React, Tailwind, and modern frontend practices.",
    thumbnail: "/images/react-course.jpg",
    lessons: [
      { id: "l1", title: "Introduction to React", content: "React is a library for building user interfaces..." },
      { id: "l2", title: "Components & Props", content: "Components are the building blocks of React apps." },
    ],
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Master Python, Pandas, and data visualization.",
    thumbnail: "/images/python-course.jpg",
    lessons: [
      { id: "l3", title: "Python Basics", content: "Variables, loops, functions..." },
    ],
  },
];