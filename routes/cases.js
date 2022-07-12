const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const cases = require('../controllers/caseController');

router.get('/cases', cases.getCases);

router.post('/cases', requiresAuth(), cases.createCases);

router.get('/cases/:id', cases.getCaseById, cases.getCase);

 router.delete('/cases/:id', requiresAuth(), cases.getCaseById, cases.deleteCase);

 router.put('/cases/:id', requiresAuth(), cases.getCaseById, cases.updateCase);


module.exports = router;