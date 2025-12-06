module.exports = {
  secret: process.env.JWT_SECRET || 'secret_key_for_development_change_in_production',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h', // ej: '1h', '7d', '24h'
};