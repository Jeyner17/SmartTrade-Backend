const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Rol, {
        foreignKey: 'ROL_CODIGO',
        as: 'rol',
      });
      Usuario.belongsTo(models.Empleado, {
        foreignKey: 'EMPL_CODIGO',
        as: 'empleado',
      });
    }

    // Método para comparar contraseñas CON BCRYPT
    async comparePassword(password) {
      return bcrypt.compare(password, this.USUA_CLAVE);
    }

    // Hook para hashear contraseña antes de crear/actualizar
    static hooks(sequelize) {
      Usuario.beforeCreate(async (usuario) => {
        if (usuario.USUA_CLAVE) {
          usuario.USUA_CLAVE = await bcrypt.hash(usuario.USUA_CLAVE, 10);
        }
      });

      Usuario.beforeUpdate(async (usuario) => {
        if (usuario.changed('USUA_CLAVE')) {
          usuario.USUA_CLAVE = await bcrypt.hash(usuario.USUA_CLAVE, 10);
        }
      });
    }
  }

  Usuario.init(
    {
      USUA_CODIGO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'USUA_CODIGO',
      },
      EMPL_CODIGO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'ge_empleados_empleado',
          key: 'EMPL_CODIGO',
        },
      },
      ROL_CODIGO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sy_seguridad_rol',
          key: 'ROL_CODIGO',
        },
      },
      USUA_NOMUSU: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      USUA_CLAVE: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      USUA_ESTADO: {
        type: DataTypes.STRING(15),
        defaultValue: 'ACTIVO',
      },
      USUA_USUING: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      USUA_FECING: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      USUA_USUMOD: DataTypes.STRING(80),
      USUA_FECMOD: DataTypes.DATE,
      USUA_USUANU: DataTypes.STRING(80),
      USUA_FECANU: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'sy_seguridad_usuario',
      timestamps: false,
      hooks: {
        beforeCreate: async (usuario) => {
          if (usuario.USUA_CLAVE) {
            usuario.USUA_CLAVE = await bcrypt.hash(usuario.USUA_CLAVE, 10);
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed('USUA_CLAVE')) {
            usuario.USUA_CLAVE = await bcrypt.hash(usuario.USUA_CLAVE, 10);
          }
        },
      },
    }
  );

  return Usuario;
};