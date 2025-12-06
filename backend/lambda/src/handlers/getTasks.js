/**
 * Lambda handler para obtener todas las tareas
 * @module handlers/getTasks
 */

const { getAllItems } = require('../utils/dynamodb');
const { successResponse, errorResponse, HTTP_STATUS } = require('../utils/response');

/**
 * Handler principal
 * @param {object} event - Evento de API Gateway
 * @param {object} context - Contexto de Lambda
 * @returns {Promise<object>} Respuesta HTTP
 */
exports.handler = async (event, context) => {
  // Mejora: Logging estructurado
  console.log('Event:', JSON.stringify(event));
  console.log('Request ID:', context.requestId);
  
  try {
    // Obtener todas las tareas
    const tasks = await getAllItems();
    
    // Ordenar por fecha de creación (más recientes primero)
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return successResponse(HTTP_STATUS.OK, {
      tasks,
      count: tasks.length
    });
    
  } catch (error) {
    console.error('Error:', error);
    
    // Manejo de errores específicos
    if (error.code === 'ResourceNotFoundException') {
      return errorResponse(
        HTTP_STATUS.NOT_FOUND,
        'Tabla no encontrada',
        { code: error.code }
      );
    }
    
    return errorResponse(
      HTTP_STATUS.INTERNAL_ERROR,
      'Error al obtener tareas',
      { message: error.message }
    );
  }
};
