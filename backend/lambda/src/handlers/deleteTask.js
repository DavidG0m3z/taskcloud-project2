/**
 * Lambda handler para eliminar una tarea
 * @module handlers/deleteTask
 */

const { deleteItem } = require('../utils/dynamodb');
const { successResponse, errorResponse, HTTP_STATUS } = require('../utils/response');
const { isValidUUID } = require('../utils/validator');

/**
 * Handler principal
 * @param {object} event - Evento de API Gateway
 * @param {object} context - Contexto de Lambda
 * @returns {Promise<object>} Respuesta HTTP
 */
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event));
  console.log('Request ID:', context.requestId);
  
  try {
    // Obtener taskId de path parameters
    const taskId = event.pathParameters?.taskId;
    
    // Validar que taskId existe
    if (!taskId) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        'taskId es requerido en la URL'
      );
    }
    
    // Validar formato de UUID
    if (!isValidUUID(taskId)) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        'taskId debe ser un UUID válido'
      );
    }
    
    // Eliminar de DynamoDB
    await deleteItem(taskId);
    
    console.log('Tarea eliminada:', taskId);
    
    return successResponse(HTTP_STATUS.OK, {
      message: 'Tarea eliminada exitosamente',
      taskId
    });
    
  } catch (error) {
    console.error('Error:', error);
    
    // Manejo de error cuando la tarea no existe
    if (error.code === 'ConditionalCheckFailedException') {
      return errorResponse(
        HTTP_STATUS.NOT_FOUND,
        'Tarea no encontrada'
      );
    }
    
    return errorResponse(
      HTTP_STATUS.INTERNAL_ERROR,
      'Error al eliminar tarea',
      { message: error.message }
    );
  }
};
