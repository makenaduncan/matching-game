const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const agencies = require('../controllers/agencyController');

// /scores GET
router.get('/agencies', agencies.getAgencies);

// /scores POST
router.post('/agencies', requiresAuth(), agencies.validateAgency, agencies.createAgencies);

// /scores/{id} GET
router.get('/agencies/:id', agencies.getAgencyById, agencies.getAgency);

// /scores/{id} DELETE
router.delete('/agencies/:id', requiresAuth(), agencies.getAgencyById, agencies.deleteAgency);

// /scores/{id} UPDATE
router.put('/agencies/:id', requiresAuth(), agencies.getAgencyById, agencies.validateAgency, agencies.updateAgency);


module.exports = router;