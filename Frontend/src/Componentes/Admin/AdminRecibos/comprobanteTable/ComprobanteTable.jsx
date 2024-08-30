import React, { useEffect } from 'react';
import styles from './ComprobanteTable.module.css';

const ComprobanteTable = ({ user, comprobantesMap, handleCellClick, handleAddClick, meses, currentYear, currentMonth }) => {
    const fechaInscripcion = new Date(user.fechaInscripcion);
    const yearInscripcion = fechaInscripcion.getFullYear();

    useEffect(() => {
        console.log("Rendering ComprobanteTable with comprobantesMap:", comprobantesMap);
    }, [comprobantesMap]);
    

    const generateRows = () => {
        const rows = [];
        for (let year = yearInscripcion; year <= currentYear; year++) {
        const cells = meses.map((_, index) => {
            const monthNumber = index + 1;

            if (year === yearInscripcion && monthNumber < fechaInscripcion.getMonth() + 1) {
            return <td key={monthNumber}></td>;
            }

            if (year === currentYear && monthNumber > currentMonth) {
            return <td key={monthNumber}></td>;
            }

            const comprobante = comprobantesMap[year]?.[monthNumber];
            
            return (
            <td
                key={monthNumber}
                className={comprobante ? styles.comprobante : styles.noComprobante}
                onClick={() => comprobante && handleCellClick(comprobante)}
            >
                {comprobante ? `RECIBO ${comprobante.numeroRecibo}` : (
                <button className={styles.addButton} onClick={() => handleAddClick(monthNumber, year)}>Agregar</button>
                )}
            </td>
            );
        });

        rows.push(
            <tr key={year}>
            <td className={styles.yearCell}>{year}</td>
            {cells}
            </tr>
        );
        }
        return rows;
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                <th>Año</th>
                {meses.map((mes, index) => (
                    <th key={index}>{mes}</th>
                ))}
                </tr>
            </thead>
            <tbody>{generateRows()}</tbody>
        </table>
    );
};

export default ComprobanteTable;
