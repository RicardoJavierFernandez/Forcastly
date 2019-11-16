const router = require('express').Router();
const productGroupsController = require('../../controllers/productgroupsController');

router.route('/')
    .get(productGroupsController.findAll)
    .post(productGroupsController.create);

router.route('/:id')
    .get(productGroupsController.findById)
    .put(productGroupsController.update)
    .delete(productGroupsController.delete);

module.exports = router;