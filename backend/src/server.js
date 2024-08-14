const app = require('./app')
const sequelize = require('./utils/connect')

const main = async () => {
    try {
        await sequelize.sync()
        console.log('database connected');
        
        app.listen(3001, () => {
            console.log('server running on port 3001')
        })
    } catch (error) {
        console.log(error);
    }
}

main()