const router = require('express').Router();
const productsController = require('../../controllers/productsController');

router.route('/')
    .get(productsController.findAll)
    .post(productsController.create);

router.route('/many')
    .post(productsController.createMany);

router.route('/:id')
    .get(productsController.findById)
    .put(productsController.update)
    .delete(productsController.delete);

module.exports = router;