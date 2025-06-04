import bcrypt from 'bcryptjs';

const contraseña = '1234';
const hash = await bcrypt.hash(contraseña, 10);
console.log(hash);



