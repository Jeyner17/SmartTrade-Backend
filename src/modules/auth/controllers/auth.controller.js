const authService = require('../services/auth.service');
const { loginSchema } = require('../validators/auth.validator');

class AuthController {
  /**
   * Login de usuario
   */
  async login(req, res, next) {
    try {
      // Validar datos de entrada
      const { error, value } = loginSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { username, password } = value;
      
      // Autenticar
      const result = await authService.login(username, password);
      
      // Enviar respuesta exitosa
      return res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result
      });
      
    } catch (error) {
      // Error de autenticación
      if (error.message.includes('incorrectos')) {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }
      
      // Error del servidor
      return res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Verificar token (para proteger rutas)
   */
  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token no proporcionado'
        });
      }

      const decoded = await authService.verifyToken(token);
      
      return res.status(200).json({
        success: true,
        message: 'Token válido',
        data: decoded
      });
      
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(req, res) {
    try {
      // El middleware de auth deberá adjuntar el usuario en req.user
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Perfil obtenido',
        data: req.user
      });
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener perfil'
      });
    }
  }
}

module.exports = new AuthController();