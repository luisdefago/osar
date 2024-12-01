const { Sequelize } = require('sequelize');
const { pg } = require('pg'); 
// require('dotenv').config();

// if (!process.env.DATABASE_URL) {
//   console.error('Error: No se ha proporcionado una URL de base de datos');
//   process.exit(1);
// }

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg, 
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

module.exports = sequelize;