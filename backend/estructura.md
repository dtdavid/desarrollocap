backend/
├── controllers/
| |** authController.js  
│ └── usuariosController.js
|** db
| |_ connection.js
| |_ db.sql
|
├── middlewares/
│ └── verificarToken.js
| |\_ authMiddleware.js
|
|-- models/
|  
├── routes/
| |** authRouthes.js
│ ├── login.routes.js
│ └── perfil.routes.js
| |** usuariosRoutes.js
├---test/
--- server.js
├── index.js
├── .env
