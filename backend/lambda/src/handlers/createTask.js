/**
 * Lambda handler para crear una tarea
 * @module handlers/createTask
 */

const { v4: uuidv4 } = require('uuid');
const { createItem } = require('../utils/dynamodb');
const { successResponse, errorResponse, HTTP_STATUS } = require('../utils/response');
const { validateTaskData } = require('../utils/validator');

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
    // Parsear body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        'JSON inválido en el body'
      );
    }
    
    // Validar datos
    const validation = validateTaskData(body);
    if (!validation.isValid) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Datos de tarea inválidos',
        { errors: validation.errors }
      );
    }
    
    // Crear objeto de tarea
    const task = {
      taskId: uuidv4(),
      taskText: body.taskText.trim(),
      createdAt: new Date().toISOString(),
      completed: false,
      updatedAt: new Date().toISOString()
    };
    
    // Guardar en DynamoDB
    await createItem(task);
    
    console.log('Tarea creada:', task.taskId);
    
    return successResponse(HTTP_STATUS.CREATED, {
      message: 'Tarea creada exitosamente',
      task
    });
    
  } catch (error) {
    console.error('Error:', error);
    
    // Manejo de error de duplicado
    if (error.code === 'ConditionalCheckFailedException') {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        'La tarea ya existe'
      );
    }
    
    return errorResponse(
      HTTP_STATUS.INTERNAL_ERROR,
      'Error al crear tarea',
      { message: error.message }
    );
  }
};
