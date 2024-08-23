import React from 'react';
import styles from './ComprobanteForm.module.css';

const ComprobanteForm = ({ newComprobante, setNewComprobante, handleSave, selectedComprobante }) => {
  return (
    <div className={styles.comprobanteDetails}>
      <h3>{selectedComprobante ? 'Editar Recibo' : 'Agregar Recibo'}</h3>
      <form className={styles.form}>
        <label>
          Número de Recibo:
          <input
            type="text"
            value={newComprobante.numeroRecibo}
            onChange={(e) => setNewComprobante({ ...newComprobante, numeroRecibo: e.target.value })}
          />
        </label>
        <label>
          Mes:
          <input
            type="number"
            value={newComprobante.mes}
            onChange={(e) => setNewComprobante({ ...newComprobante, mes: parseInt(e.target.value, 10) })}
          />
        </label>
        <label>
          Año:
          <input
            type="number"
            value={newComprobante.año}
            onChange={(e) => setNewComprobante({ ...newComprobante, año: parseInt(e.target.value, 10) })}
          />
        </label>
        <label>
          Fecha de Pago:
          <input
            type="date"
            value={newComprobante.fechaPago}
            onChange={(e) => setNewComprobante({ ...newComprobante, fechaPago: e.target.value })}
          />
        </label>
        <label>
          Monto:
          <input
            type="number"
            value={newComprobante.monto}
            onChange={(e) => setNewComprobante({ ...newComprobante, monto: parseFloat(e.target.value) })}
          />
        </label>
        <button className={styles.saveButton} type="button" onClick={handleSave}>
          {selectedComprobante ? 'Guardar Cambios' : 'Agregar Recibo'}
        </button>
      </form>
    </div>
  );
};

export default ComprobanteForm;
