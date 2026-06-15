export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;   // optional video URL
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  language: string;
  lessons: Lesson[];
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Frontend Development with React",
    description: "Learn React, Tailwind CSS, and modern frontend development.",
    thumbnail: "/images/react-course.jpg",
    language: "en",
    lessons: [
      {
        id: "l1",
        title: "Introduction to React",
        content: "React is a JavaScript library for building user interfaces. It allows you to create reusable components.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        id: "l2",
        title: "Components & Props",
        content: "Components are the building blocks of React apps. Props are read-only inputs to components.",
        videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0"
      },
      {
        id: "l3",
        title: "State & Hooks",
        content: "useState and useEffect are fundamental hooks for managing state and side effects."
      }
    ]
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Master Python, Pandas, and data visualization.",
    thumbnail: "/images/python-course.jpg",
    language: "en",
    lessons: [
      {
        id: "l4",
        title: "Python Basics",
        content: "Variables, loops, functions, and data structures.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw"
      },
      {
        id: "l5",
        title: "Data Analysis with Pandas",
        content: "Using Pandas for data manipulation and cleaning."
      }
    ]
  },
  {
    id: "3",
    title: "JavaScript Fundamentals",
    description: "Deep dive into JavaScript – closures, promises, async/await.",
    thumbnail: "/images/js-course.jpg",
    language: "en",
    lessons: [
      {
        id: "l6",
        title: "Variables & Scope",
        content: "var, let, const, and lexical scoping.",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk"
      },
      {
        id: "l7",
        title: "Asynchronous JavaScript",
        content: "Promises, async/await, and error handling."
      }
    ]
  }
];