const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { verifyToken, isAdmin } = require('../../middleware/auth');

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Painel administrativo
 *     description: Endpoint protegido para acesso ao painel administrativo.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do painel administrativo.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado.
 */
router.get('/dashboard', verifyToken, isAdmin, adminController.getDashboard);

module.exports = router;
