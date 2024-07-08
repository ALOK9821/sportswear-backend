const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// @route    POST api/payments
// @desc     Create payment intent
// @access   Private
router.post('/', auth, paymentController.createPaymentIntent);

module.exports = router;
