const express = require('express');
const router = express.Router();
const query = require('../query');
const config = require('../../config.json');

router.route("/admin")
    .get(async(req, res, next) => {
        res.render('admin/index', {err: ''});
    })
    .post(async(req, res, next) => {
        var { ID, PW } = req.body;
        if(ID != config.adminId){
            return res.render('admin/index', {err: '계정이 일치하지 않습니다.'});
        } else {
            if(PW != config.adminPassword){
                return res.render('admin/index', {err: '비밀번호가 일치하지 않습니다.'});
            } else {
                req.session.admin = config.inspector;
                return res.redirect('/issue');
            }
        }

    })

module.exports = router;