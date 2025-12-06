/**
 * Utilidades para operaciones de DynamoDB
 * @module utils/dynamodb
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { TABLE_NAME, REGION } = require('../config/constants');

// Crear cliente de DynamoDB
const client = new DynamoDBClient({
  region: REGION,
  maxAttempts: 3
});

// Crear DocumentClient con configuración optimizada
const dynamodb = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  }
});

/**
 * Obtiene todos los items de una tabla
 * @returns {Promise<Array>} Array de items
 */
const getAllItems = async () => {
  const command = new ScanCommand({
    TableName: TABLE_NAME
  });
  
  const result = await dynamodb.send(command);
  return result.Items || [];
};

/**
 * Crea un nuevo item en la tabla
 * @param {object} item - Item a crear
 * @returns {Promise<object>} Item creado
 */
const createItem = async (item) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
    ConditionExpression: 'attribute_not_exists(taskId)' // Evitar duplicados
  });
  
  await dynamodb.send(command);
  return item;
};

/**
 * Elimina un item de la tabla
 * @param {string} taskId - ID del item a eliminar
 * @returns {Promise<void>}
 */
const deleteItem = async (taskId) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { taskId },
    ConditionExpression: 'attribute_exists(taskId)' // Verificar que existe
  });
  
  await dynamodb.send(command);
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem
};
