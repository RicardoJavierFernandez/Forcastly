const router = require('express').Router();
const transactionTypesController = require('../../controllers/transactiontypesController');

router.route('/')
    .get(transactionTypesController.findAll)
    .post(transactionTypesController.create);

router.route('/:id')
    .get(transactionTypesController.findById)
    .put(transactionTypesController.update)
    .delete(transactionTypesController.delete);

module.exports = router;

