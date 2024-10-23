const express = require('express');
const router = express.Router();

const MainController = require('../controllers/Main.js');

router.get('/', MainController.index);
router.get('/api', MainController.api);
router.get('/update-schedule', MainController.updateSchedule);

module.exports = router;