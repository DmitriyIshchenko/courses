// UTILITY TYPES

// PARTIAL
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // return { title, description, completeUntil: date };

  // make all props optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}

// READONLY
const names: Readonly<string[]> = ["Max", "Anna"];

// names.push("Pete"); // Error
// names.pop() // Error

// GENERICS VS UNION TYPES
