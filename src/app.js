const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { connectDB } = require('./config/db');

// Carrega variáveis de ambiente
require('./config/env');

// Conecta ao PostgreSQL
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas dos módulos existentes
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const userRoutes = require('./modules/user/user.routes');

// Rotas do novo módulo Incident
const incidentRoutes = require('./modules/incident/incident.routes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/incidents', incidentRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
