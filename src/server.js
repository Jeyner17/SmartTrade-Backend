const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar configuraciones
const appConfig = require('./config/app');
const sequelize = require('./config/database');
const errorMiddleware = require('./middlewares/error.middleware');

// Importar módulos/rutas
const authRoutes = require('./modules/auth/routes/auth.routes'); 

// Crear aplicación Express
const app = express();

// ================= MIDDLEWARES BÁSICOS =================
// Seguridad
app.use(helmet());

// CORS
app.use(cors());

// Logs en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= RUTAS =================
// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a SMARITTRADE API',
    version: appConfig.apiVersion,
    environment: appConfig.environment
  });
});

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    database: 'Connected', 
    timestamp: new Date().toISOString() 
  });
});

// ================= MÓDULOS =================
// Módulo de autenticación
app.use('/api/auth', authRoutes);

// ================= MIDDLEWARE DE ERRORES =================
app.use(errorMiddleware);

// ================= INICIAR SERVIDOR =================
const startServer = async () => {
  try {
    // Probar conexión a BD
    await sequelize.authenticate();
    console.log(' ✓ Conexión a PostgreSQL establecida.');

    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      const { sequelize: db } = require('./database/index');
      await db.sync({ alter: true });
      console.log('Modelos sincronizados.');
    }

    // Iniciar servidor
    app.listen(appConfig.port, () => {
      console.log(`Servidor corriendo en: http://localhost:${appConfig.port} ✓ `);
      console.log(`Entorno: ${appConfig.environment}`);
      console.log(`API: http://localhost:${appConfig.port}/api ✓ `);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error.message);
    process.exit(1);
  }
};

// Manejar cierre elegante
process.on('SIGINT', async () => {
  console.log('\nApagando servidor...');
  await sequelize.close();
  console.log('Conexiones cerradas. ✓ ');
  process.exit(0);
});

// Iniciar
startServer();

module.exports = app; // Para tests