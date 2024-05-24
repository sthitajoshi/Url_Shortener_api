const express = require('express');
const router = express.Router();

const { generateShorturl, handlegetAnalytics } = require('../controllers/url');  // Fixed typo

router.post('/', generateShorturl);
router.get('/:shortId', handlegetAnalytics);

module.exports = router;
