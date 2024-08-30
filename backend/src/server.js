const app = require('./app');
const sequelize = require('./utils/connect');
const admin = require('firebase-admin');

// console.log('Private Key:', process.env.FIREBASE_PRIVATE_KEY);
// console.log('Replaced Key:', process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'));

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
    await sequelize.sync();
    console.log('Database connected');
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
