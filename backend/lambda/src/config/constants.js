/**
 * Constantes de configuración de la aplicación
 * @module config/constants
 */

module.exports = {
  TABLE_NAME: process.env.TABLE_NAME || 'TaskCloudTasks',
  REGION: process.env.AWS_REGION || 'us-east-1',
  CORS_HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Content-Type': 'application/json'
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  }
};
