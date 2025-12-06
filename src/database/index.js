const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Importar las funciones
const usuarioModel = require('../modules/auth/models/Usuario');
const rolModel = require('../modules/auth/models/Rol');
const empleadoModel = require('../modules/auth/models/empleado');

// Inicializar modelos
const Usuario = usuarioModel(sequelize);
const Rol = rolModel(sequelize);
const Empleado = empleadoModel(sequelize);

// Configurar asociaciones
if (Usuario.associate) {
  Usuario.associate({ Usuario, Rol, Empleado });
}
if (Rol.associate) {
  Rol.associate({ Usuario, Rol, Empleado });
}
if (Empleado.associate) {
  Empleado.associate({ Usuario, Rol, Empleado });
}

// Exportar modelos
module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Rol,
  Empleado,
};