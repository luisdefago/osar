const { DatosTransferencia } = require('../models');


// GET: Obtener todas las entradas de DatosTransferencia
const getAllTransferData = async (req, res) => {
    try {
        const transferData = await DatosTransferencia.findAll();
        res.status(200).json(transferData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transfer data', error });
    }
};


// POST: Crear una nueva entrada en DatosTransferencia
const postTransferData = async (req, res) => {
    try {
        const { tipo, nroCuenta, nombreCompleto, cuit, cbu, alias, telefonoContacto, precioCuota } = req.body;

        const newTransferData = await DatosTransferencia.create({
        tipo,
        nroCuenta,
        nombreCompleto,
        cuit,
        cbu,
        alias,
        telefonoContacto,
        precioCuota
        });
        res.status(201).json(newTransferData);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transfer data', error });
    }
};


// PUT: Actualizar una entrada en DatosTransferencia por ID
const updateTransferData = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, nroCuenta, nombreCompleto, cuit, cbu, alias, telefonoContacto, precioCuota } = req.body;

        const transferData = await DatosTransferencia.findByPk(id);

        if (!transferData) {
        return res.status(404).json({ message: 'Transfer data not found' });
        }

        transferData.tipo = tipo || transferData.tipo;
        transferData.nroCuenta = nroCuenta || transferData.nroCuenta;
        transferData.nombreCompleto = nombreCompleto || transferData.nombreCompleto;
        transferData.cuit = cuit || transferData.cuit;
        transferData.cbu = cbu || transferData.cbu;
        transferData.alias = alias || transferData.alias;
        transferData.telefonoContacto = telefonoContacto || transferData.telefonoContacto;
        transferData.precioCuota = precioCuota || transferData.precioCuota;

        await transferData.save();

        res.status(200).json(transferData);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transfer data', error });
    }
};


// DELETE: Eliminar una entrada en DatosTransferencia por ID
const deleteTransferData = async (req, res) => {
    try {
        const { id } = req.params;
    
        const transferData = await DatosTransferencia.findByPk(id);
    
        if (!transferData) {
            return res.status(404).json({ message: 'Transfer data not found' });
        }
    
        await transferData.destroy();
    
        res.status(200).json({ message: 'Transfer data deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting transfer data', error });
    }
};

module.exports = {
    getAllTransferData,
    postTransferData,
    updateTransferData,
    deleteTransferData,
};