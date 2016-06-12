'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/kits', require('./kits.js'));
router.use('/reviews', require('./reviews.js'));
router.use('/orders', require('./orders'));
router.use('/cart', require('./cart'));
router.use('/categories', require('./category'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
