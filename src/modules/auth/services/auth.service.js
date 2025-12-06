// modules/auth/services/auth.service.js - ACTUALIZADO
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol, Empleado } = require('../../../database/index');
const jwtConfig = require('../../../config/jwt');

class AuthService {
  /**
   * Autentica un usuario y genera JWT
   */
  async login(username, password) {
    try {
      // Buscar usuario con su rol y empleado
      const usuario = await Usuario.findOne({
        where: { 
          USUA_NOMUSU: username,
          USUA_ESTADO: 'ACTIVO'
        },
        include: [
          {
            model: Rol,
            as: 'rol',
            attributes: ['ROL_CODIGO', 'ROL_NOMBRE', 'ROL_DESCRI']
          },
          {
            model: Empleado,
            as: 'empleado',
            attributes: ['EMPL_CODIGO', 'EMPL_NOMBRE', 'EMPL_APELLIDO', 'EMPL_CEDULA', 'EMPL_CORREO']
          }
        ]
      });

      if (!usuario) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      // Verificar contraseña CON BCRYPT
      const isPasswordValid = await bcrypt.compare(password, usuario.USUA_CLAVE);
      
      if (!isPasswordValid) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      // Crear payload para JWT
      const payload = {
        usuarioId: usuario.USUA_CODIGO,
        username: usuario.USUA_NOMUSU,
        rolId: usuario.ROL_CODIGO,
        rolNombre: usuario.rol?.ROL_NOMBRE || '',
        empleadoId: usuario.EMPL_CODIGO,
        nombreCompleto: `${usuario.empleado?.EMPL_NOMBRE || ''} ${usuario.empleado?.EMPL_APELLIDO || ''}`.trim()
      };

      // Generar token
      const token = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
      });

      return {
        token,
        usuario: {
          id: usuario.USUA_CODIGO,
          username: usuario.USUA_NOMUSU,
          rol: usuario.rol?.ROL_NOMBRE,
          nombreCompleto: payload.nombreCompleto,
          cedula: usuario.empleado?.EMPL_CEDULA,
          correo: usuario.empleado?.EMPL_CORREO
        }
      };
    } catch (error) {
      throw new Error(`Error en autenticación: ${error.message}`);
    }
  }

  /**
   * Registrar un nuevo usuario con contraseña hasheada
   */
  async registerUsuario(data) {
    try {
      // Hashear contraseña antes de crear
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      const usuario = await Usuario.create({
        ...data,
        USUA_CLAVE: hashedPassword
      });
      
      return usuario;
    } catch (error) {
      throw new Error(`Error al registrar usuario: ${error.message}`);
    }
  }

  // ... resto del código igual
}

module.exports = new AuthService();