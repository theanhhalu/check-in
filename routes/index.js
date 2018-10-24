const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/', Controller.getToIndex);
router.get('/checkin/:mstt', Controller.authMember, Controller.checkInMember);
router.get('/checked', Controller.getToChecked);
router.get('/reset', Controller.getReset);
router.post('/resetAll', Controller.resetAll);
router.get('/list', Controller.getListMembers);
module.exports = router;

