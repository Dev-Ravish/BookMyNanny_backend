const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { isSignedIn, isAdmin, isAutherised, isNanny } = require('../controllers/auth');
const {  getAllNannies } = require('../controllers/nanny');

//params
router.param('userId', getUserById);

router.get('/nannies', getAllNannies);

module.exports = router ;