const router = require('express').Router();
const transactionsController = require('../../controllers/transactionsController');

router.route('/')
    .get(transactionsController.findAll)
    .post(transactionsController.create);

router.route('/:id')
    .get(transactionsController.findById)
    .put(transactionsController.update)
    .delete(transactionsController.delete);

module.exports = router;
