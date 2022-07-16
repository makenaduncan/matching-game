const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const users = require('../controllers/userController');

// /score GET single user based on data passed by Auth0
router.get('/profile', requiresAuth(), users.getProfile)

// /scores GET
router.get('/users', requiresAuth(), users.getUsers);

// /scores POST
router.post('/users', requiresAuth(), users.validateUser, users.createUser);

// /scores/{id} GET
router.get('/users/:id', requiresAuth(), users.getUserById, users.getUser);

// /scores/{id} DELETE
router.delete('/users/:id', requiresAuth(), users.getUserById, users.deleteUser);

router.put('/users/:id', requiresAuth(), users.getUserById, users.validateUser, users.updateUser)
module.exports = router;