const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const users = require('../controllers/userController');

// /scores GET
router.get('/users', requiresAuth(), users.getUsers);

// /scores POST
router.post('/users', requiresAuth(), users.createUser);

// /scores/{id} GET
router.get('/users/:id', requiresAuth(), users.getUserById, users.getUser);

// /scores/{id} DELETE
router.delete('/users/:id', requiresAuth(), users.getUserById, users.deleteUser);

// /scores/{id} UPDATE
router.put('/users/:id', requiresAuth(), users.getUserById, users.updateUser);


module.exports = router;