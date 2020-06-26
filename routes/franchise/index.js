const express = require('express');
const router = express.Router();
const query = require('../query');
const { checkAdmin } = require('../issue');
const config = require('../../config.json');

router.route("/franchise")
    .get(checkAdmin)
    .get(async(req, res, next) => {
        var sql = "SELECT * FROM location WHERE inspector=?";
        var locations = await query.executeSQL(sql, [config.inspector]);
        res.render('franchise/index', { locations });
    })

module.exports = router;