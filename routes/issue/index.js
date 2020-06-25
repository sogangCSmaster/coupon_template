const express = require('express');
const router = express.Router();
const query = require('../query');
const config = require('../../config.json');

const checkAdmin = async(req, res, next) => {
    var { admin } = req.session;
    if(!admin || admin!=config.inspector){
        return res.redirect("/admin");
    } else {
        return next();
    }
}

router.route("/issue")
    .get(checkAdmin)
    .get(async(req, res, next) => {
        res.render('issue/index');
    })

module.exports = router;
module.exports.checkAdmin = checkAdmin;