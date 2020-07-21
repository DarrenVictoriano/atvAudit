const router = require('express').Router();
const auditController = require('../../Controller/auditController');

// @route       api/audit/startadb
router.route("/startadb")
    // @desc-GET   start and show all conented devices
    .get(auditController.showConnectedDevices);

//@route        api/audit/connect
router.route("/connect")
    //  @desc-POST  connect new device
    .post(auditController.connectAdbDevice);

//@route        api/audit/audit
router.route("/start")
    //  @desc-POST  start audit
    .post(auditController.startAudit);



module.exports = router;