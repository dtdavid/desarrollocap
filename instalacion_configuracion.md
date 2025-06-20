🧱 1. ESTRUCTURA DE CARPETAS

```bash
src/
├── assets/           # Imágenes, logos, íconos
├── components/       # Header, Footer, CardCurso, etc.
├── pages/            # Home.jsx, Login.jsx, Register.jsx, Perfil.jsx, Carrito.jsx, CursoDetalle.jsx
├── routes/           # index.jsx para configurar React Router
├── styles/           # variables.css o tailwind.config.js
├── App.jsx           # Enrutamiento principal y layout
└── main.jsx          # Root rendering
```

🛠️ 2. INSTALACIÓN DEL PROYECTO

```bash
npm create vite@latest frontend --template react
cd frontend
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Configura tailwind.config.js:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
```

- Configura src/index.css:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🔄 Iniciar el servidor de desarrollo

```bash
npm run dev -- --host
```

```cpp
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.X.XX:5173/
```

**Puedes usar tu móvil para ver el diseño en local, al ngresar la IP que te muestre en Network**

#### Revisión manual de estructura en Git Bash

```bash
tree -L 2 backend
```

```bash
ls backend/models
ls backend/routes
ls backend/controllers
```

#### Revisión manual de estructura en pwsh

```powershell
Get-ChildItem .\backend -Recurse | Format-Table FullName
```

ó

```powershell
Get-ChildItem .\backend -Directory
```

```powershell
Get-ChildItem .\backend\models
Get-ChildItem .\backend\routes
Get-ChildItem .\backend\controllers
```
