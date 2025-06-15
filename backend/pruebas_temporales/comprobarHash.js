import bcrypt from 'bcryptjs';

const hash = '$2b$10$4Ths6Jzc6bCz5vgtfsbu5ui75d6nQOuQ3RSoEVKyMcA7D63gRdkUC';
const password = 'David@55';

const valid = await bcrypt.compare(password, hash);
console.log('¿Password válido?', valid);
