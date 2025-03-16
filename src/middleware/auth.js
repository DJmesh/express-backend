// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'sua_chave_secreta';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado: Apenas administradores podem acessar este recurso' });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};
