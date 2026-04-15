// src/shared/utils/ApiResponse.js
// Respuestas estandarizadas para toda la API

class ApiResponse {
  static success(res, data = null, message = 'OK', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, data = null, message = 'Recurso creado exitosamente') {
    return ApiResponse.success(res, data, message, 201);
  }

  static error(res, message = 'Error interno', statusCode = 500, errors = null) {
    const body = { success: false, message };
    if (errors) body.errors = errors;
    return res.status(statusCode).json(body);
  }

  static notFound(res, message = 'Recurso no encontrado') {
    return ApiResponse.error(res, message, 404);
  }

  static unauthorized(res, message = 'No autorizado') {
    return ApiResponse.error(res, message, 401);
  }

  static forbidden(res, message = 'Acceso denegado') {
    return ApiResponse.error(res, message, 403);
  }

  static validationError(res, errors) {
    return res.status(422).json({
      success: false,
      message: 'Error de validación',
      errors,
    });
  }
}

module.exports = ApiResponse;
