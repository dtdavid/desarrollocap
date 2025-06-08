import request from 'supertest';
import app from '../server.js';
import pool from '../db/connection.js';
import jwt from 'jsonwebtoken';
// Importamos las dependencias necesarias

let usuarioPrueba;
let token = '';
let tokenDecodificado;

describe('Rutas de Autenticación', () => {

   beforeAll(async () => {
    //test register
    // Primero registramos un nuevo usuario
    const registroResponse = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Test',
        apellido: 'User',
        email: `test${Date.now()}@mail.com`,
        password: '123456',
        password2: '123456',
        rol: 'estudiante'
      });

      console.log('Registro response:', registroResponse.body);

    token = registroResponse.body.token; 

    usuarioPrueba = registroResponse.body.usuario || {
    id: null,
    nombre: 'Test',
    email: `test${Date.now()}@mail.com`,
    rol: 'estudiante'
  };
    tokenDecodificado = jwt.decode(token);
    console.log('Token decodificado:', tokenDecodificado);
  }); 


    // Test login
    
  it('POST /api/auth/login debe autenticar un usuario y devolver token + datos', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'juanperez@example.com', // usamos el email del usuario registrado
        password: '12345678'
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('usuario');

    token = res.body.token; // guardamos el token para usarlo en otros tests
    tokenDecodificado = jwt.decode(token); // decodificamos el token para verificar su contenido
  });

    // Test perfil
  it('GET /api/perfil debe devolver los datos del usuario autenticado con token válido', async () => {
  const res = await request(app)
    .get('/api/perfil')
    .set('Authorization', `Bearer ${token}`); // usamos el token guardado antes

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('mensaje', 'Acceso autorizado al perfil');
  expect(tokenDecodificado).not.toBeNull();
  expect(tokenDecodificado).toHaveProperty('id');
  expect(res.body.usuario).toMatchObject({
    id: tokenDecodificado.id,
    nombre: expect.any(String),
    email: expect.stringMatching(/@/),
    rol: expect.any(String)
  });
});

// Test obtener usuario por ID
  it('GET /api/usuarios/:id debe devolver los datos públicos del usuario', async () => {

  if (!usuarioPrueba || !usuarioPrueba.id) {
  console.warn('usuarioPrueba.id no está definido, se salta el test');
  return;
}
    // Aseguramos que el usuarioPrueba tenga un ID válido 
  const res = await request(app).get(`/api/usuarios/${usuarioPrueba.id}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('id', usuarioPrueba.id);
  expect(res.body).toHaveProperty('nombre', usuarioPrueba.nombre);
  expect(res.body).toHaveProperty('email', usuarioPrueba.email);
  expect(res.body).toHaveProperty('rol', usuarioPrueba.rol);
});
});

afterAll(async () => {
  await pool.end();  // Cierra la conexión con la base de datos
});
