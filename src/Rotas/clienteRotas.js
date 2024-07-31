const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

router.post('/', ClientController.createClient);
router.put('/:id', ClientController.updateClient);
router.delete('/:id', ClientController.deleteClient);
router.get('/', ClientController.listAllClients);

module.exports = router;
