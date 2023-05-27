const express = require('express');
const { processPayment, rasorpayResponse, getPaymentStatus } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/process').post(processPayment);
// router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);

router.route('/payment/callback').post(rasorpayResponse);

router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);

module.exports = router;