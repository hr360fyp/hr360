import bcrypt from "bcryptjs";

const users = [
  {
    role: "admin",
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    role: "admin",
    name: "user",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
