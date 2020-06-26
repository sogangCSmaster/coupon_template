const express = require('express');
const router = express.Router();
const query = require('../query');
const config = require('../../config.json');
// const cc = require('coupon-code');

const checkAdmin = async(req, res, next) => {
    var { admin } = req.session;
    if(!admin || admin!=config.inspector){
        return res.redirect("/admin");
    } else {
        return next();
    }
}

const cc = (length) => {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

router.route("/issue")
    .get(checkAdmin)
    .get(async(req, res, next) => {
        var sql = "SELECT COUNT(*) as count FROM coupon WHERE inspector=?";
        var sql2 = "SELECT COUNT(*) as count FROM coupon WHERE inspector=? AND usedAt is NULL";
        
        var total = await query.executeSQL(sql, [config.inspector]);
        total = total[0].count;
        var notUsed = await query.executeSQL(sql2, [config.inspector]);
        notUsed = notUsed[0].count;

        res.render('issue/index', {total, notUsed});
    })
    .post(checkAdmin)
    .post(async(req, res, next) => {
        var { expiresAt } = req.body;
        var coupon = cc(12);
        var sql = "INSERT INTO coupon (couponNum, expiresAt, inspector) VALUES (?, ?, ?)";
        query.executeSQL(sql, [coupon, expiresAt, config.inspector])
            .then((result) => {
                res.send(coupon);
            })
            .catch((err) => {
                res.send('error');
            })
    })

module.exports = router;
module.exports.checkAdmin = checkAdmin;