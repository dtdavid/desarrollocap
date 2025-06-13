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

-- Evaluaciones
CREATE TABLE Evaluaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    curso_id INT REFERENCES Cursos(id) ON DELETE CASCADE,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha DATE DEFAULT CURRENT_DATE
);

-- Mensajes
CREATE TABLE Mensajes (
    id SERIAL PRIMARY KEY,
    remitente_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    destinatario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    contenido TEXT,
    fecha_envio DATE DEFAULT CURRENT_DATE,
    leido BOOLEAN DEFAULT FALSE
);




-- Insert de administrador
INSERT INTO Usuarios (nombre, apellido, email, password, rol) 
VALUES ('David', 'Docampo', 'admin@otec.com', '$2b$10$CONTRASEÑA_HASH', 'administrador' );

-- Insert usuario de ejemplo
INSERT INTO usuarios (nombre, email, password, rol )
VALUES ('Usuario de prueba', 'usuario@ejemplo.com', '$2b$10$/uy0nWX7sVC57pLlpf9NN.5ipEM4F55PPd8tHddii4aqGEcUGYKPi', 'estudiante');
-- el passwor de este usuario de ejemplo es 1234 y le hice un hash con bcrypt desde el archivo "hashear_password.js" usando node hashear_password.js desde la terminal y cambias el "1234" por el password hasheado en el insert a la base de datos y en el Thunder Client usamos el texto plano "1234"