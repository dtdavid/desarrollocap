# Guía de colaboración con GIT y GITHUB

1. Configuración inicial

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

```

2. Crear una **rama** para tu tarea
   - Cada vez que empieces una nueva funcionalidad:

```bash
git checkout main               # Cambiar a la rama principal
git pull origin main            # Traer y fusionar los últimos cambios remotos
```

- Después creas una rama en tu terminal para trabajar sin machacar el repositorio:

```bash
git checkout -b nombre-de-tu-rama

```

**Ejemplo:**

```bash
git checkout -b feature/estructura-carpeta

```

3. Haz cambios y commit
   - Trabaja normalmente, crea, modifica archivos. Luego:

```bash
git add .
git commit -m "feat: crear estructura inicial de carpetas para frontend"

```

✅ Buenas prácticas para mensajes de **commit**:

- **feat**: → nueva funcionalidad
- **fix**: → corrección de bugs
- **refactor**: → cambio de código sin cambiar funcionalidad
- **style**: → cambio visual o de formato (CSS, clases, etc.)
- **docs**: → cambios en la documentación
- **test**: → añadir o modificar tests
- **chore**: → tareas de mantenimiento (build, configuración, etc.)

4. SUBIR LA RAMA A GITHUB

```bash
git push -u origin nombre-de-tu-rama
```

**Ejemplo:**

```bash
git push - u origin feature/estructura-carpeta
```

5. ABRIR UN **PULL REQUEST**

1. Ve al repositorio en GitHub
1. Verás un botón que dice "**Compare & pull request**"
1. En el comentario explica qué hiciste
1. Elige que se fusione contra la rama **main**
1. Crea el **pull request**

💡 Alguien del equipo revisa y aprueba (revisión por pares).

6. HACER **MERGE** A main

   Cuando esté aprobado el **Pull Request**:

- Haz clic en **Merge pull request**

- Luego, **Delete branch** (opcional pero recomendable). **Es mejor trabajar con ramas nuevas siempre**

7. ACTUALIZA TU CÓDIGO LOCAL

   Para asegurarte de estar siempre actualizado:

```bash
git checkout main
git pull origin main
```

8. <b>Subir cambios al mismo repositorio (si clonas por primera vez)</b>

Si alguien clona el repositorio y luego quiere subir una nueva rama:

Asegúrate de estar autenticado correctamente con GitHub.

Sube la rama con:

git push -u origin nombre-de-tu-rama

✅ Solo es necesario hacer esto una vez por rama.

9. Comandos útiles extra

- ver que remotos se tienen configurados
git remote -v

- Cambiar repositorio raiz para insertar cambios en repositorio de github
git remote set-url origin dirección gitHub del nuevo repositorio


- Ver todas las ramas:

```bash
git branch -a
```

- Eliminar una rama local

```bash
git branch -d nombre-de-tu-rama
```

- Eliminar una rama remota

```bash
git push origin --delete nombre-de-tu-rama
```

- Volver al estado mas reciente de main

```bash
git checkout main
git reset --hard origin/main
```

## UTILIZAR REACT-ICONS

```bash
npm install react-icons
```

**Ícono** - **Uso**
FaUser - Login / perfil de usuario
FaShoppingCart - Acceso al carrito
FaPhoneAlt - Número de teléfono en header o footer
FaEnvelope - Email de contacto
FaBars - Menú hamburguesa (mobile)
FaHome - Ir a inicio
FaSearch - Buscar cursos o contenidos
FaArrowLeft - Volver atrás
FaArrowRight - Ir hacia adelante / continuar
FaSignOutAlt - Cerrar sesión
FaPlus - Crear publicación / curso
FaEdit - Editar perfil o curso
FaTrash - Eliminar curso
FaFacebook, FaInstagram, FaLinkedin Footer/redes sociales
**https://react-icons.github.io/react-icons/**
