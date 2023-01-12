const express = require('express');
const router = express.Router();

const {isAutherised} = require('../controllers/auth')
const { sendOtp, verifyOtp } = require('../controllers/whatsappOtp');

router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);

module.exports = router;
