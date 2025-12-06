const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validateRequest = require('../../../middlewares/validation.middleware');
const { loginSchema } = require('../validators/auth.validator');

// Ruta de login
router.post('/login', validateRequest(loginSchema, 'body'), authController.login);

// Ruta para verificar token
router.get('/verify', authController.verifyToken);

// Ruta para obtener perfil
router.get('/profile', authController.getProfile);

module.exports = router;