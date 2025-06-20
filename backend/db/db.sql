-- Base de datos: otec

-- Tabla de usuarios
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro DATE DEFAULT CURRENT_DATE,
    activo BOOLEAN DEFAULT TRUE,
    rol VARCHAR(20) DEFAULT 'estudiante' 
        CHECK (rol IN ('administrador', 'docente', 'estudiante')) NOT NULL
);

-- Perfil extendido del usuario
CREATE TABLE PerfilesUsuario (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50),
    foto_perfil VARCHAR(255),
    biografia TEXT,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);

-- Tabla de cursos
CREATE TABLE Cursos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    nivel VARCHAR(50),
    precio DECIMAL(10, 2),
    fecha_inicio DATE,
    fecha_fin DATE,
    duracion VARCHAR(50),
    disponible BOOLEAN DEFAULT TRUE,
    modalidad VARCHAR(50),
    docencia VARCHAR(100),
    imagen VARCHAR(255),
    instructor_id INT REFERENCES Usuarios(id) ON DELETE SET NULL,
    estado VARCHAR(50)
);



-- Insert Cursos
-- INSERT INTO Cursos (titulo, descripcion, categoria, nivel, precio, fecha_inicio, fecha_fin, duracion, disponible, modalidad, docencia, imagen, instructor_id, estado)   
-- VALUES 
-- ('Curso de React', 'Aprende a crear aplicaciones web con React.', 'Desarrollo Web', 'Intermedio', 50000, '2025-01-01', '2025-02-01', '4 semanas', TRUE, 'e-learning', 'Asincrónica', 'https://example.com/imagenes/react.png', 1, 'activo'),
-- ('Curso de Node.js', 'Desarrolla aplicaciones backend con Node.js.', 'Desarrollo Backend', 'Avanzado', 60000, '2025-03-01', '2025-04-01', '4 semanas', TRUE, 'presencial', 'Sincrónica', 'https://example.com/imagenes/nodejs.png', 2, 'activo');


-- Inscripciones
CREATE TABLE Inscripciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    curso_id INT REFERENCES Cursos(id) ON DELETE CASCADE,
    fecha_inscripcion DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(50)
);

-- Recursos del curso
CREATE TABLE RecursosCurso (
    id SERIAL PRIMARY KEY,
    curso_id INT REFERENCES Cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(255),
    tipo VARCHAR(50), -- video, documento, enlace
    url VARCHAR(255),
    fecha_subida DATE DEFAULT CURRENT_DATE
);
 -- Insert para RecursosCurso
-- INSERT INTO RecursosCurso (curso_id, titulo, tipo, url)
-- VALUES 
-- (1, 'Introducción a React', 'video', 'https://example.com/videos/introduccion-react.mp4'),
-- (2, 'Documentación de React', 'documento', 'https://reactjs.org/docs/getting-started.html');



-- Evaluaciones
CREATE TABLE Evaluaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    curso_id INT REFERENCES Cursos(id) ON DELETE CASCADE,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha DATE DEFAULT CURRENT_DATE
);

-- Insert de evaluaciones
-- INSERT INTO Evaluaciones (usuario_id, curso_id, calificacion, comentario)
-- VALUES 
-- (1, 1, 5, 'Excelente curso, muy bien explicado.'),
-- (6, 1, 4, 'Buen curso, aunque faltaron algunos temas.'),
-- (1, 1, 3, 'Curso regular, esperaba más contenido.');

-- Mensajes
CREATE TABLE Mensajes (
    id SERIAL PRIMARY KEY,
    remitente_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    destinatario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    contenido TEXT,
    fecha_envio DATE DEFAULT CURRENT_DATE,
    leido BOOLEAN DEFAULT FALSE
);


-- Insert Mensajes
-- INSERT INTO Mensajes (remitente_id, destinatario_id, contenido)
-- VALUES 
-- (1, 2, 'Hola, ¿cómo estás?'),
-- (2, 1, 'Estoy bien, gracias. ¿Y tú?'),
-- (3, 1, '¿Tienes dudas sobre el curso?'),
-- (4, 5, 'Hola, ¿puedes ayudarme con la tarea?'),
-- (5, 4, 'Claro, ¿qué necesitas?');

-- INSERT INTO Mensajes (remitente_id, destinatario_id, contenido)
-- VALUES (19, 6, 'Hola, soy el usuario 1 enviando este mensaje de prueba');



-- Insert de administrador
-- INSERT INTO Usuarios (nombre, apellido, email, password, rol) 

-- VALUES ('David', 'Docampo', 'admin3@otec.com', '$2b$10$4Ths6Jzc6bCz5vgtfsbu5ui75d6nQOuQ3RSoEVKyMcA7D63gRdkUC', 'administrador');

-- VALUES ('David', 'Docampo', 'admin@otec.com', '$2b$10$CONTRASEÑA_HASH', 'administrador' );


-- Insert usuario de ejemplo
-- INSERT INTO usuarios (nombre, email, password, rol )
-- VALUES ('Usuario de prueba', 'usuario@ejemplo.com', '$2b$10$/uy0nWX7sVC57pLlpf9NN.5ipEM4F55PPd8tHddii4aqGEcUGYKPi', 'estudiante');
-- el password de este usuario de ejemplo es 1234 y le hice un hash con bcrypt desde el archivo "hashear_password.js" usando node hashear_password.js desde la terminal y cambias el "1234" por el password hasheado en el insert a la base de datos y en el Thunder Client usamos el texto plano "1234"

-- Insert de un curso de ejemplo

-- INSERT INTO cursos (
--   titulo, descripcion, categoria, nivel, precio,
--   fecha_inicio, fecha_fin, duracion, disponible,
--   modalidad, docencia, imagen, instructor_id, estado
-- )
-- VALUES (
--   'Curso de React desde Cero',
--   'Aprende a crear aplicaciones modernas con React, JSX, hooks y Vite.',
--   'Desarrollo Web',
--   'Intermedio',
--   75000,
--   '2025-07-01',
--   '2025-08-15',
--   '6 semanas',
--   true,
--   'e-learning',
--   'Asincrónica',
--   'https://example.com/imagenes/react.png',
--   1,  -- Asegúrate de que este ID de instructor exista en la tabla usuarios
--   'activo'
-- );                                                    
