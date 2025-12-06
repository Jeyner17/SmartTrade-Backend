const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Empleado extends Model {
    static associate(models) {
      // Un empleado tiene un usuario asociado
      Empleado.hasOne(models.Usuario, {
        foreignKey: 'EMPL_CODIGO',
        as: 'usuario',
      });
    }
  }

  Empleado.init(
    {
      EMPL_CODIGO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'EMPL_CODIGO',
      },
      EMPL_CEDULA: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      EMPL_NOMBRE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      EMPL_APELLIDO: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      EMPL_GENERO: DataTypes.STRING(15),
      EMPL_FECNAC: DataTypes.DATEONLY,
      EMPL_TELEFONO: DataTypes.STRING(15),
      EMPL_CORREO: DataTypes.STRING(100),
      EMPL_DIRECCION: DataTypes.STRING(200),
      EMPL_CARGO: DataTypes.STRING(50),
      EMPL_SALARIO: DataTypes.DECIMAL(10, 2),
      EMPL_FECING: DataTypes.DATEONLY,
      EMPL_ESTADO: {
        type: DataTypes.STRING(15),
        defaultValue: 'ACTIVO',
      },
      EMPL_USUING: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      EMPL_FECING_DEFAULT: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      EMPL_USUMOD: DataTypes.STRING(80),
      EMPL_FECMOD: DataTypes.DATE,
      EMPL_USUANU: DataTypes.STRING(80),
      EMPL_FECANU: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Empleado',
      tableName: 'ge_empleados_empleado',
      timestamps: false,
    }
  );

  return Empleado;
};