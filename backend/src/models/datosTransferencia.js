module.exports = (sequelize, DataTypes) => {
    const DatosTransferencia = sequelize.define('DatosTransferencia', {
        tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        nroCuenta: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        nombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        cuit: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        cbu: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        alias: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        telefonoContacto: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        precioCuota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    });

    return DatosTransferencia;
};
