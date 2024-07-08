const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// @route    POST api/payments/order
// @desc     Create Razorpay order
// @access   Private
router.post('/order', auth, paymentController.createOrder);

// @route    POST api/payments/verify
// @desc     Verify Razorpay payment
// @access   Private
router.post('/verify', auth, paymentController.verifyPayment);

module.exports = router;
