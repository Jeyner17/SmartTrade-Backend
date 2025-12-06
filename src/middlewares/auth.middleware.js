const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * Middleware para verificar JWT
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Acceso no autorizado. Token requerido.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verificar token
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    // Adjuntar información del usuario a la request
    req.user = {
      id: decoded.usuarioId,
      username: decoded.username,
      rolId: decoded.rolId,
      rolNombre: decoded.rolNombre,
      empleadoId: decoded.empleadoId,
      nombreCompleto: decoded.nombreCompleto
    };
    
    // Continuar con la siguiente función middleware
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

module.exports = authMiddleware;