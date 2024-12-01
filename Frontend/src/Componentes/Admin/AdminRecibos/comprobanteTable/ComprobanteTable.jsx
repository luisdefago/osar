import styles from './ComprobanteTable.module.css';

const ComprobanteTable = ({ user, comprobantesMap, handleCellClick, handleAddClick, meses, currentYear, currentMonth }) => {
    const fechaInscripcion = new Date(user.fechaInscripcion);
    const yearInscripcion = fechaInscripcion.getFullYear();

    const generateRows = () => {
        const rows = [];
        
        // Calcular la fecha máxima (año y medio después de la fecha actual)
        const fechaMaxima = new Date();
        fechaMaxima.setMonth(fechaMaxima.getMonth() + 18);
        const yearMaximo = fechaMaxima.getFullYear();

        // Comenzar desde el año de inscripción, terminar un año y medio después
        for (let year = yearInscripcion; year <= yearMaximo; year++) {
            const cells = meses.map((_, index) => {
                const monthNumber = index + 1;
                const fechaActual = new Date(year, monthNumber - 1);

                // Saltar meses anteriores a la fecha de inscripción
                if (year === yearInscripcion && monthNumber < fechaInscripcion.getMonth() + 1) {
                    return <td key={monthNumber}></td>;
                }

                // Saltar meses futuros más allá de un año y medio
                if (fechaActual > fechaMaxima) {
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
        <div className={styles.tableContainer}>
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
        </div>
    );
};

export default ComprobanteTable;