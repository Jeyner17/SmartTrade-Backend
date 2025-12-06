// src/database/migrations/YYYYMMDDHHMMSS-create-initial-tables-for-login.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tabla sy_seguridad_rol
    await queryInterface.createTable('sy_seguridad_rol', {
      ROL_CODIGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ROL_NOMBRE: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      ROL_DESCRI: {
        type: Sequelize.STRING(200),
      },
      ROL_ESTADO: {
        type: Sequelize.STRING(15),
        defaultValue: 'ACTIVO',
      },
      ROL_USUING: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      ROL_FECING: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      ROL_USUMOD: {
        type: Sequelize.STRING(80),
      },
      ROL_FECMOD: {
        type: Sequelize.DATE,
      },
      ROL_USUANU: {
        type: Sequelize.STRING(80),
      },
      ROL_FECANU: {
        type: Sequelize.DATE,
      },
    });

    // 2. Tabla ge_empleados_empleado
    await queryInterface.createTable('ge_empleados_empleado', {
      EMPL_CODIGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      EMPL_CEDULA: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      EMPL_NOMBRE: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      EMPL_APELLIDO: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      EMPL_GENERO: {
        type: Sequelize.STRING(15),
      },
      EMPL_FECNAC: {
        type: Sequelize.DATEONLY,
      },
      EMPL_TELEFONO: {
        type: Sequelize.STRING(15),
      },
      EMPL_CORREO: {
        type: Sequelize.STRING(100),
      },
      EMPL_DIRECCION: {
        type: Sequelize.STRING(200),
      },
      EMPL_CARGO: {
        type: Sequelize.STRING(50),
      },
      EMPL_SALARIO: {
        type: Sequelize.DECIMAL(10, 2),
      },
      EMPL_FECING: {
        type: Sequelize.DATEONLY,
      },
      EMPL_ESTADO: {
        type: Sequelize.STRING(15),
        defaultValue: 'ACTIVO',
      },
      EMPL_USUING: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      EMPL_FECING_DEFAULT: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      EMPL_USUMOD: {
        type: Sequelize.STRING(80),
      },
      EMPL_FECMOD: {
        type: Sequelize.DATE,
      },
      EMPL_USUANU: {
        type: Sequelize.STRING(80),
      },
      EMPL_FECANU: {
        type: Sequelize.DATE,
      },
    });

    // 3. Tabla sy_seguridad_usuario
    await queryInterface.createTable('sy_seguridad_usuario', {
      USUA_CODIGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      EMPL_CODIGO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'ge_empleados_empleado',
          key: 'EMPL_CODIGO',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      ROL_CODIGO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sy_seguridad_rol',
          key: 'ROL_CODIGO',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      USUA_NOMUSU: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      USUA_CLAVE: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      USUA_ESTADO: {
        type: Sequelize.STRING(15),
        defaultValue: 'ACTIVO',
      },
      USUA_USUING: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      USUA_FECING: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      USUA_USUMOD: {
        type: Sequelize.STRING(80),
      },
      USUA_FECMOD: {
        type: Sequelize.DATE,
      },
      USUA_USUANU: {
        type: Sequelize.STRING(80),
      },
      USUA_FECANU: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar en orden inverso por dependencias de FK
    await queryInterface.dropTable('sy_seguridad_usuario');
    await queryInterface.dropTable('ge_empleados_empleado');
    await queryInterface.dropTable('sy_seguridad_rol');
  },
};