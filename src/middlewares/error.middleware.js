// src/middlewares/error.middleware.js
/**
 * Middleware para manejo centralizado de errores
 */
const errorMiddleware = (err, req, res, next) => {
  console.error('[Error Middleware]:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Errores de validación Joi
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: err.details ? err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      })) : [err.message]
    });
  }

  // Errores de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expirado'
    });
  }

  // Error personalizado con status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Error por defecto (500)
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? 'Error interno del servidor' : err.message;

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
};

module.exports = errorMiddleware;