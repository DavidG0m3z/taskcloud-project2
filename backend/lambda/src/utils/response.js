/**
 * Utilidades para crear respuestas HTTP estandarizadas
 * @module utils/response
 */

const { CORS_HEADERS, HTTP_STATUS } = require('../config/constants');

/**
 * Crea una respuesta HTTP exitosa
 * @param {number} statusCode - Código de estado HTTP
 * @param {object} data - Datos de la respuesta
 * @returns {object} Respuesta HTTP formateada
 */
const successResponse = (statusCode, data) => ({
  statusCode,
  headers: CORS_HEADERS,
  body: JSON.stringify({
    success: true,
    data,
    timestamp: new Date().toISOString()
  })
});

/**
 * Crea una respuesta HTTP de error
 * @param {number} statusCode - Código de estado HTTP
 * @param {string} message - Mensaje de error
 * @param {object} details - Detalles adicionales del error
 * @returns {object} Respuesta HTTP formateada
 */
const errorResponse = (statusCode, message, details = null) => ({
  statusCode,
  headers: CORS_HEADERS,
  body: JSON.stringify({
    success: false,
    error: {
      message,
      details,
      timestamp: new Date().toISOString()
    }
  })
});

module.exports = {
  successResponse,
  errorResponse,
  HTTP_STATUS
};
