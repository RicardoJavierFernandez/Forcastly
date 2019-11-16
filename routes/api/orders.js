const router = require('express').Router();
const ordersController = require('../../controllers/ordersController');

router.route('/')
    .get(ordersController.findAll);

module.exports = router;