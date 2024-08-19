// validaciones.js

export const validarEmail = (email) => {
    return email.includes('@');
  };
  
  export const validarDocumento = (documento) => {
    return !isNaN(documento) && documento.trim() !== '';
  };
  
  export const validarNombreCompleto = (nombreCompleto) => {
    return nombreCompleto.trim() !== '';
  };
  
  export const validarFechaInscripcion = (fecha) => {
    const fechaRegex = /^\d{2}\/\d{2}\/\d{2}$/;
    return fechaRegex.test(fecha);
  };
  
  export const formatearFecha = (fecha) => {
    const cleanFecha = fecha.replace(/\D/g, '');
    const parts = cleanFecha.match(/(\d{1,2})(\d{1,2})?(\d{1,2})?/);
  
    if (!parts) return fecha;
  
    let formattedFecha = parts[1];
    if (parts[2]) formattedFecha += '/' + parts[2];
    if (parts[3]) formattedFecha += '/' + parts[3];
  
    return formattedFecha.slice(0, 8);
  };
  