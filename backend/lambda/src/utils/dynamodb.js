/**
 * Utilidades para operaciones de DynamoDB
 * @module utils/dynamodb
 */

const AWS = require('aws-sdk');
const { TABLE_NAME, REGION } = require('../config/constants');

// Configurar DynamoDB con opciones optimizadas
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: REGION,
  maxRetries: 3,
  httpOptions: {
    timeout: 5000
  }
});

/**
 * Obtiene todos los items de una tabla
 * @returns {Promise<Array>} Array de items
 */
const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  
  const result = await dynamodb.scan(params).promise();
  return result.Items || [];
};

/**
 * Crea un nuevo item en la tabla
 * @param {object} item - Item a crear
 * @returns {Promise<object>} Item creado
 */
const createItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
    ConditionExpression: 'attribute_not_exists(taskId)' // Evitar duplicados
  };
  
  await dynamodb.put(params).promise();
  return item;
};

/**
 * Elimina un item de la tabla
 * @param {string} taskId - ID del item a eliminar
 * @returns {Promise<void>}
 */
const deleteItem = async (taskId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { taskId },
    ConditionExpression: 'attribute_exists(taskId)' // Verificar que existe
  };
  
  await dynamodb.delete(params).promise();
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem
};
