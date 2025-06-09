import bcrypt from "bcryptjs";

const contraseña = "Gabriel@7";
const hash = await bcrypt.hash(contraseña, 10);
console.log(hash);
