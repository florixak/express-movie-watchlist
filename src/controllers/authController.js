import { prisma } from "../config/db.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  res.json({ message: "Register route" });

  // Hash the password here if needed (not shown in this snippet)
  // const hashedPassword = await hashPassword(password);
};

const login = async (req, res) => {
  return res.json({ message: "Login route" });
};

export { register, login };
