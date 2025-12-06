/**
 * Utilidades de validación de datos
 * @module utils/validator
 */

/**
 * Valida que un string no esté vacío
 * @param {string} value - Valor a validar
 * @returns {boolean} True si es válido
 */
const isNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Valida los datos de una tarea
 * @param {object} taskData - Datos de la tarea
 * @returns {object} Resultado de validación
 */
const validateTaskData = (taskData) => {
  const errors = [];
  
  if (!taskData) {
    errors.push('No se proporcionaron datos');
    return { isValid: false, errors };
  }
  
  if (!isNonEmptyString(taskData.taskText)) {
    errors.push('taskText es requerido y debe ser un string no vacío');
  }
  
  if (taskData.taskText && taskData.taskText.length > 500) {
    errors.push('taskText no puede exceder 500 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida un UUID v4
 * @param {string} uuid - UUID a validar
 * @returns {boolean} True si es válido
 */
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

module.exports = {
  isNonEmptyString,
  validateTaskData,
  isValidUUID
};
