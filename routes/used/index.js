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
        res.render('used/index', { coupons, moment });
    })

module.exports = router;