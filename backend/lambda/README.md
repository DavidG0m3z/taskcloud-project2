# TaskCloud API - Backend Serverless

API serverless para gestión de tareas implementada con AWS Lambda y DynamoDB.

## Estructura del Proyecto
```
backend/lambda/
├── src/
│   ├── handlers/          # Lambda handlers
│   │   ├── getTasks.js    # GET /tasks
│   │   ├── createTask.js  # POST /tasks
│   │   └── deleteTask.js  # DELETE /tasks/{taskId}
│   ├── utils/             # Utilidades compartidas
│   │   ├── response.js    # Respuestas HTTP estandarizadas
│   │   ├── dynamodb.js    # Cliente DynamoDB
│   │   └── validator.js   # Validación de datos
│   └── config/            # Configuración
│       └── constants.js   # Constantes de la aplicación
├── package.json
└── README.md
```

## Mejores Prácticas Implementadas

1. **Separación de responsabilidades**: Código modular y reutilizable
2. **Manejo de errores robusto**: Errores específicos y mensajes claros
3. **Validación de datos**: Validación exhaustiva de inputs
4. **Logging estructurado**: Logs con contexto para debugging
5. **Respuestas estandarizadas**: Formato consistente de respuestas
6. **Principio DRY**: Código reutilizable en utils
7. **Seguridad**: Validación de UUIDs, prevención de duplicados
8. **CORS configurado**: Headers CORS apropiados
9. **Timeouts y reintentos**: Configuración de resiliencia
10. **Documentación JSDoc**: Código auto-documentado

## Variables de Entorno

- `TABLE_NAME`: Nombre de la tabla DynamoDB (default: TaskCloudTasks)
- `AWS_REGION`: Región de AWS (default: us-east-1)

## Despliegue

Ver instrucciones en el directorio raíz del proyecto.
