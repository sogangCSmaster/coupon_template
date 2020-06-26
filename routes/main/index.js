const express = require('express');
const router = express.Router();
const query = require('../query');
const moment = require('moment');

router.route("/")
    .get(async(req, res, next) => {
        var sql = "SELECT market as name, marketSub FROM location WHERE inspector=?";
        var datas = await query.executeSQL(sql, ['nene']);
        res.render('main/index', { datas });
    })
    .post(async(req, res, next) => {
        var { location, coupon, inspector } = req.body;
        coupon = coupon.replace(/-/gi, '');
        var sql = "SELECT * FROM coupon WHERE couponNum=? AND inspector=?";
        var data = await query.executeSQL(sql, [coupon, inspector]);
        if(data.length==0){
            return res.send('발급되지 않은 쿠폰 번호입니다.');
        }
        data = data[0];
        if(data.usedAt){
            return res.send('이미 '+data.usedLocation+'에서 사용된 쿠폰입니다.');
        }

        var today = moment().format('YYYY-MM-DD');
        var expiresAt = moment(data.expiresAt).format('YYYY-MM-DD');
        if(expiresAt<today){
            return res.send('유효기간이 지난 쿠폰입니다.');
        }

        var sql2 = "UPDATE coupon SET usedAt=?, usedLocation=? WHERE couponNum=? AND inspector=?";
        await query.executeSQL(sql2, [moment().format('YYYY-MM-DD HH:mm:ss'), location, coupon, inspector]);
        res.send('쿠폰 사용 처리 완료되었습니다.');
    })

module.exports = router;