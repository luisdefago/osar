import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DatosTransferencia.module.css';
import { useUpdateDatosTransferencia } from '../../../hooks/useUpdateDatosTransferencia';
import { useStore } from '../../../store/store';

function EditDatosTransferencia() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { datosTransferencia, setDatosTransferencia } = useStore();
    const { updateDatosTransferencia, loading: savingLoading, error } = useUpdateDatosTransferencia();

    const [tipo, setTipo] = useState('');
    const [nroCuenta, setNroCuenta] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [cuit, setCuit] = useState('');
    const [cbu, setCbu] = useState('');
    const [alias, setAlias] = useState('');
    const [telefonoContacto, setTelefonoContacto] = useState(['']);
    const [precioCuota, setPrecioCuota] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (datosTransferencia == null) {
        navigate('/Admin');
        return;
        }

        const foundDatos = datosTransferencia.find((d) => d.id === parseInt(id));
        
        if (foundDatos) {
        setTipo(foundDatos.tipo || '');
        setNroCuenta(foundDatos.nroCuenta || '');
        setNombreCompleto(foundDatos.nombreCompleto || '');
        setCuit(foundDatos.cuit || '');
        setCbu(foundDatos.cbu || '');
        setAlias(foundDatos.alias || '');
        setTelefonoContacto(foundDatos.telefonoContacto || ['']);
        setPrecioCuota(foundDatos.precioCuota || '');
        } else {
        navigate('/Admin');
        }
    }, [id, datosTransferencia, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!tipo) newErrors.tipo = 'El tipo es obligatorio.';
        if (!nroCuenta) newErrors.nroCuenta = 'El número de cuenta es obligatorio.';
        if (!nombreCompleto) newErrors.nombreCompleto = 'El nombre completo es obligatorio.';
        if (!cuit) newErrors.cuit = 'El CUIT es obligatorio.';
        if (!cbu) newErrors.cbu = 'El CBU es obligatorio.';
        if (!alias) newErrors.alias = 'El alias es obligatorio.';
        if (!precioCuota) newErrors.precioCuota = 'El precio de la cuota es obligatorio.';
        if (telefonoContacto.some((tel) => !tel)) newErrors.telefonoContacto = 'Todos los teléfonos deben ser válidos.';

        if (Object.keys(newErrors).length === 0) {
        const updatedDatos = await updateDatosTransferencia(id, {
            tipo,
            nroCuenta,
            nombreCompleto,
            cuit,
            cbu,
            alias,
            telefonoContacto,
            precioCuota
        });

        if (updatedDatos) {
            setMessage('Datos de transferencia actualizados exitosamente.');
            setDatosTransferencia(datosTransferencia.map((d) => (d.id === parseInt(id) ? updatedDatos : d)));
            navigate('/Admin');
        }
        } else {
        setErrors(newErrors);
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setMessage('');
    };

    const handleTelefonoChange = (index, value) => {
        const nuevosTelefonos = [...telefonoContacto];
        nuevosTelefonos[index] = value;
        setTelefonoContacto(nuevosTelefonos);
        setMessage('');
    };

    const handleAddTelefono = () => {
        setTelefonoContacto([...telefonoContacto, '']);
    };

    const handleRemoveTelefono = (index) => {
        const nuevosTelefonos = telefonoContacto.filter((_, i) => i !== index);
        setTelefonoContacto(nuevosTelefonos);
    };

    const handleCancel = () => {
        navigate('/Admin');
    };

    return (
        <div className={styles.formWrapper}>
        <div className={message ? styles.formContainerWithResult : styles.formContainer}>
            <h1 className={styles.title}>Editar Datos de Transferencia</h1>
            <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="tipo">Tipo</label>
                <input
                type="text"
                id="tipo"
                value={tipo}
                onChange={handleInputChange(setTipo)}
                required
                />
                {errors.tipo && <p className={styles.errorMessage}>{errors.tipo}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="nroCuenta">Número de Cuenta</label>
                <input
                type="text"
                id="nroCuenta"
                value={nroCuenta}
                onChange={handleInputChange(setNroCuenta)}
                required
                />
                {errors.nroCuenta && <p className={styles.errorMessage}>{errors.nroCuenta}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="nombreCompleto">Nombre Completo</label>
                <input
                type="text"
                id="nombreCompleto"
                value={nombreCompleto}
                onChange={handleInputChange(setNombreCompleto)}
                required
                />
                {errors.nombreCompleto && <p className={styles.errorMessage}>{errors.nombreCompleto}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="cuit">CUIT</label>
                <input
                type="text"
                id="cuit"
                value={cuit}
                onChange={handleInputChange(setCuit)}
                required
                />
                {errors.cuit && <p className={styles.errorMessage}>{errors.cuit}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="cbu">CBU</label>
                <input
                type="text"
                id="cbu"
                value={cbu}
                onChange={handleInputChange(setCbu)}
                required
                />
                {errors.cbu && <p className={styles.errorMessage}>{errors.cbu}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="alias">Alias</label>
                <input
                type="text"
                id="alias"
                value={alias}
                onChange={handleInputChange(setAlias)}
                required
                />
                {errors.alias && <p className={styles.errorMessage}>{errors.alias}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label>Teléfonos de Contacto</label>
                {telefonoContacto.map((telefono, index) => (
                <div key={index} className={styles.telefonoInput}>
                    <input
                    type="text"
                    value={telefono}
                    onChange={(e) => handleTelefonoChange(index, e.target.value)}
                    required
                    />
                    <button type="button" onClick={() => handleRemoveTelefono(index)}>Eliminar</button>
                </div>
                ))}
                <button type="button" className={styles.addTelefonoButton} onClick={handleAddTelefono}>
                Agregar Teléfono
                </button>
                {errors.telefonoContacto && <p className={styles.errorMessage}>{errors.telefonoContacto}</p>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="precioCuota">Precio Cuota</label>
                <input
                type="number"
                id="precioCuota"
                value={precioCuota}
                onChange={handleInputChange(setPrecioCuota)}
                required
                />
                {errors.precioCuota && <p className={styles.errorMessage}>{errors.precioCuota}</p>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={savingLoading}>
                {savingLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>

            <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                Cancelar
            </button>

            {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
            {message && <p className={styles.resultMessage}>{message}</p>}
            </form>
        </div>
        </div>
    );
}

export default EditDatosTransferencia;
