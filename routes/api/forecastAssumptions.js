const router = require('express').Router();
const forecastAssumptionsController = require('../../controllers/forecastAssumptionsController');

router.route('/')
    .get(forecastAssumptionsController.findAll)
    .post(forecastAssumptionsController.create);

router.route('/:id')
    .get(forecastAssumptionsController.findById)
    .put(forecastAssumptionsController.update)
    .delete(forecastAssumptionsController.delete);

module.exports = router;