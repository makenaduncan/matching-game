const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// // Require Controller
// const games = require('../controllers/gameController');

// // /scores GET
// router.get('/games', games.getGames);

// // /scores POST
// router.post('/games', requiresAuth(), games.createGames);



// // /scores/{id} GET
// router.get('/games/:id', scores.getGameById, games.getGame);

// // /scores/{id} DELETE
// router.delete('/games/:id', requiresAuth(), games.getGameById, scores.deleteGame);

// // /scores/{id} UPDATE
// router.put('/games/:id', requiresAuth(), games.getGameById, scores.updateGame);



// // /scores/{ranking} GET
// router.get('/games/:ranking', games.getGameById, games.getScore);

// // /scores/{ranking} DELETE
// router.delete('/games/:ranking', requiresAuth(), games.getGameById, games.deleteGame);

// // /scores/{ranking} UPDATE
// router.put('/games/:ranking', requiresAuth(), games.getGameById, games.updateGame);


module.exports = router;