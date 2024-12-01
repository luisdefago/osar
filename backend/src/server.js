const app = require('./app');
const sequelize = require('./utils/connect');
const admin = require('firebase-admin');

// // Cargar variables de entorno lo más temprano posible
// require('dotenv').config();

// // Validación de variables de entorno cruciales
// const requiredEnvVars = [
//   'DATABASE_URL', 
//   'FIREBASE_PROJECT_ID', 
//   'FIREBASE_CLIENT_EMAIL', 
//   'FIREBASE_PRIVATE_KEY'
// ];

// requiredEnvVars.forEach(varName => {
//   if (!process.env[varName]) {
//     console.error(`Error: Falta la variable de entorno ${varName}`);
//     process.exit(1);
//   }
// });

// Inicialización de Firebase Admin SDK con variables de entorno
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const main = async () => {
  try {
    // Intentar conectar a la base de datos
    await sequelize.sync();
    console.log('✅ Base de datos conectada correctamente');
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    // Salir del proceso con código de error
    process.exit(1);
  }
};

// // Manejar cualquier error no capturado
// process.on('uncaughtException', (error) => {
//   console.error('uncaughtException:', error);
//   process.exit(1);
// });

// // Manejar rechazos de promesas no manejados
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('unhandledRejection:', reason);
//   process.exit(1);
// });

main();