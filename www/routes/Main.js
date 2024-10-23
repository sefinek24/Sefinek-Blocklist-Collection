const express = require('express');
const router = express.Router();

const MainController = require('../controllers/Main.js');

router.get('/', MainController.index);
router.get('/update-schedule', MainController.updateSchedule);

module.exports = router;