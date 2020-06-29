const express = require('express');
const router = express.Router();
const query = require('../query');
const { checkAdmin } = require('../issue');
const config = require('../../config.json');
const moment = require('moment');

router.route("/used")
    .get(checkAdmin)
    .get(async(req, res, next) => {
        var sql = "SELECT * FROM coupon WHERE inspector=?";
        var coupons = await query.executeSQL(sql, [config.inspector]);
        var sql2 = "SELECT COUNT(CASE WHEN usedAt IS NULL THEN 1 END) as notUsed, COUNT(*) as total FROM coupon WHERE inspector=?";
        var data = await query.executeSQL(sql2, [config.inspector]);
        data = data[0];
        res.render('used/index', { coupons, moment, data });
    })

module.exports = router;