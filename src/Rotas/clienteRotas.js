const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

router.get('/', ClientController.listAllClients);
router.get('/:id', ClientController.getClientById);
router.post('/', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), ClientController.createClient);
router.put('/:id', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), ClientController.updateClient);
router.delete('/:id', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), ClientController.deleteClient);

module.exports = router;
