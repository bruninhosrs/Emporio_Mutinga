const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
//const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

router.post('/', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ ClientController.createClient);
router.put('/:id', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ ClientController.updateClient);
router.delete('/:id', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ ClientController.deleteClient);
router.get('/', ClientController.listAllClients);

module.exports = router;
