const { Usuario, Comprobante } = require('../models');

const getUserByDocumento = async (req, res) => {
    const { documento } = req.params;
    try {
        const user = await Usuario.findOne({
            where: { documento },
            include: [{
                model: Comprobante,
                as: 'comprobantes',
            }],
        });
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(user);
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({ message: 'Error fetching user by documento', error: error.toString() });
    }
};

module.exports = { getUserByDocumento };