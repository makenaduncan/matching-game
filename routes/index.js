const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/', require('./cases'));
router.use('/', require('./game'));
router.use('/', require('./score'));
router.use('/', require('./agency'));
router.use('/', require('./user'));


module.exports = router;