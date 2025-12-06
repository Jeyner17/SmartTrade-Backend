const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'El nombre de usuario es obligatorio',
      'string.min': 'El usuario debe tener al menos 3 caracteres',
      'string.max': 'El usuario no puede exceder 50 caracteres',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'La contraseña es obligatoria',
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
    }),
});

module.exports = {
  loginSchema,
};