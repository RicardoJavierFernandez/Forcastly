const router = require('express').Router();
const productsRoutes = require('./products');
const productGroupsRoutes = require('./productgroups');
const forecastAssumptionsRoutes = require('./forecastAssumptions');
const usersRoutes = require('./users');
const transactionTypeRoutes = require('./transactiontypes');
const inventoryRoutes = require('./inventory');
const transactionsRoutes = require('./transactions');
const ordersRoutes = require('./orders');

router.use('/products', productsRoutes);
router.use('/productgroups', productGroupsRoutes);
router.use('/assumptions', forecastAssumptionsRoutes);
router.use('/users', usersRoutes);
router.use('/transactiontypes', transactionTypeRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;

