interface UserPart {
  id: string;
  name: string;
  age: number;
}

interface UserPart2 {
  id: number;
  phone: string;
}

// @ts-expect-error
interface User extends UserPart, UserPart2 {}

const user: User = {
  id: "1",
  name: "John",
  age: 20,
  phone: "123456789",
};
