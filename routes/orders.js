const express = require('express');
const router = express.Router();

// Order routes
router.get('/', (req, res) => res.send('Order Route'));

module.exports = router;
