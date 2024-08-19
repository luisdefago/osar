const app = require('./app');
const sequelize = require('./utils/connect');

const main = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('database connected');
        
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
