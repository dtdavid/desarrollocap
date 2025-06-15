import bcrypt from 'bcryptjs';

const password = 'David@55'; // la contraseña que quieras hashear
const hash = await bcrypt.hash(password, 10);
console.log(hash);




