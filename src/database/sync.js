const models = require('./index');

async function syncDatabase({ force = false, alter = false } = {}) {
  try {
    // Importar asociaciones
    require('./associations')(models);

    // Sincronizar modelos
    await models.sequelize.sync({ force, alter });
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error.message);
    process.exit(1);
  }
}

// Si se ejecuta directamente: node src/database/sync.js
if (require.main === module) {
  const force = process.argv.includes('--force');
  const alter = process.argv.includes('--alter');
  syncDatabase({ force, alter });
}

module.exports = syncDatabase;