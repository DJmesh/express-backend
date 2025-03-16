const express = require('express');
const router = express.Router();
const incidentController = require('./incident.controller');
const { verifyToken } = require('../../middleware/auth');

/**
 * @swagger
 * /api/incidents:
 *   post:
 *     summary: Cria um novo incidente
 *     description: Cria uma nova ocorrência com título, usuário (opcional), localização (opcional) e imagens.
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Incidente de teste"
 *               userId:
 *                 type: integer
 *                 description: ID do usuário (opcional)
 *                 example: 1
 *               location:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Rua das Flores, 123"
 *                   latitude:
 *                     type: number
 *                     example: -23.550520
 *                   longitude:
 *                     type: number
 *                     example: -46.633308
 *                 description: Dados do local (opcionais, conforme disponibilidade da localização)
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array de URLs das imagens
 *                 example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
 *     responses:
 *       201:
 *         description: Incidente criado com sucesso.
 *       500:
 *         description: Erro ao criar o incidente.
 */
router.post('/', verifyToken, incidentController.createIncident);

/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: Lista todos os incidentes
 *     description: Retorna uma lista de todos os incidentes com seus dados de localização, imagens e usuário.
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de incidentes.
 *       500:
 *         description: Erro ao buscar os incidentes.
 */
router.get('/', verifyToken, incidentController.getAllIncidents);

/**
 * @swagger
 * /api/incidents/{id}:
 *   get:
 *     summary: Busca um incidente por ID
 *     description: Retorna os detalhes de um incidente específico, incluindo localização, imagens e informações do usuário.
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do incidente
 *     responses:
 *       200:
 *         description: Detalhes do incidente.
 *       404:
 *         description: Incidente não encontrado.
 *       500:
 *         description: Erro ao buscar o incidente.
 */
router.get('/:id', verifyToken, incidentController.getIncidentById);

module.exports = router;
