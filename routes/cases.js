const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const cases = require('../controllers/caseController');

// /scores GET
router.get('/cases', cases.getCases);

// /scores POST
router.post('/cases', requiresAuth(), cases.createCases);

// /scores/{id} GET
router.get('/cases/:id', cases.getCaseById, cases.getCase);

// // /scores/{id} DELETE
// router.delete('/agencies/:id', requiresAuth(), agencies.getAgencyById, agencies.deleteAgency);

// // /scores/{id} UPDATE
// router.put('/agencies/:id', requiresAuth(), agencies.getAgencyById, agencies.updateAgency);


module.exports = router;