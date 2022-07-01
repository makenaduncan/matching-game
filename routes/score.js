const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const scores = require('../controllers/scoreController');

// /scores GET
router.get('/scores', scores.getScores);

// /scores POST
router.post('/scores', requiresAuth(), scores.createScores);

// /scores/{id} GET
router.get('/scores/:id', scores.getScoreById, scores.getScoreWithID);

// /scores/{id} DELETE
router.delete('/scores/:id', requiresAuth(), scores.getScoreById, scores.deleteScoreWithID);

// /scores/{id} UPDATE
router.put('/scores/:id', requiresAuth(), scores.getScoreById, scores.updateScoreWithID);



// /scores/{ranking} GET
router.get('/scores/:ranking', scores.getScoreByRanking, scores.getScoreWithRanking);

// /scores/{ranking} DELETE
router.delete('/scores/:ranking', requiresAuth(), scores.getScoreByRanking, scores.deleteScoreWithRanking);

// /scores/{ranking} UPDATE
router.put('/scores/:ranking', requiresAuth(), scores.getScoreByRanking, scores.updateScoreWithRanking);


module.exports = router;