// Arquivo "barrel" para centralizar exports de middlewares, utils, etc.

module.exports = {
  authMiddleware: require('../middleware/auth'),
  errorHandler: require('../middleware/errorHandler'),
  logger: require('../utils/logger'),
};
