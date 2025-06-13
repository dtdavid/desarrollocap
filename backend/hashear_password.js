import bcrypt from "bcryptjs";

const password = "Gabriel@7"; // la contraseña que quieras hashear
const hash = await bcrypt.hash(password, 10);
console.log(hash);
