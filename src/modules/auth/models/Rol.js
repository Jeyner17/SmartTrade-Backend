const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Rol extends Model {
    static associate(models) {
      // Un rol puede tener muchos usuarios
      Rol.hasMany(models.Usuario, {
        foreignKey: 'ROL_CODIGO',
        as: 'usuarios',
      });
    }
  }

  Rol.init(
    {
      ROL_CODIGO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ROL_CODIGO',
      },
      ROL_NOMBRE: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      ROL_DESCRI: DataTypes.STRING(200),
      ROL_ESTADO: {
        type: DataTypes.STRING(15),
        defaultValue: 'ACTIVO',
      },
      ROL_USUING: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      ROL_FECING: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      ROL_USUMOD: DataTypes.STRING(80),
      ROL_FECMOD: DataTypes.DATE,
      ROL_USUANU: DataTypes.STRING(80),
      ROL_FECANU: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Rol',
      tableName: 'sy_seguridad_rol',
      timestamps: false,
    }
  );

  return Rol;
};