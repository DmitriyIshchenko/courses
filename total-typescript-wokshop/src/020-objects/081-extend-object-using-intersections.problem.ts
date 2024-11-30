import { Extends, Expect } from "@total-typescript/helpers";

type BaseEntity = {
  id: string;
  createdAt: Date;
};

type User = BaseEntity & {
  name: string;
  email: string;
};

type Product = BaseEntity & {
  name: string;
  price: number;
};

type tests = [
  Expect<
    Extends<
      {
        id: string;
        createdAt: Date;
        name: string;
        email: string;
      },
      User
    >
  >,
  Expect<
    Extends<
      {
        id: string;
        createdAt: Date;
        name: string;
        price: number;
      },
      Product
    >
  >,
];
