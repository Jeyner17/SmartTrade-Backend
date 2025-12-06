module.exports = (models) => {
  const {
    Usuario,
    Rol,
    Empleado,
    // [⬇⬇ PONER MÁS MODELOS ⬇⬇]
  } = models;

  // Usuario pertenece a un Rol
  Usuario.belongsTo(Rol, { foreignKey: 'ROL_CODIGO' });
  Rol.hasMany(Usuario, { foreignKey: 'ROL_CODIGO' });

  // Usuario está vinculado a un Empleado
  Usuario.belongsTo(Empleado, { foreignKey: 'EMPL_CODIGO' });
  Empleado.hasOne(Usuario, { foreignKey: 'EMPL_CODIGO' });

  
  // [⬇⬇ Proximas Asociaciones ⬇⬇]
  // Más adelante: Rol -> Permiso -> Formulario -> Módulo
};