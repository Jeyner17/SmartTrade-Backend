const express = require('express');
const router = express.Router();

// Importar rutas de auth
const authRoutes = require('./routes/auth.routes');

// Usar las rutas
router.use('/auth', authRoutes);

// Exportar el router
module.exports = router;