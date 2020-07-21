const router = require('express').Router();
const auditRouter = require('./auditRoutes');

router.use("/audit", auditRouter);

module.exports = router;