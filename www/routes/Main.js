const express = require('express');
const router = express.Router();


const MainController = require('../controllers/Main.js');

router.get('/', MainController.index);
router.get('/changelog', MainController.changelog);
router.get('/api', MainController.api);
router.get('/update-frequency', MainController.updateFrequency);


module.exports = router;