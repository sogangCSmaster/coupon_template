const express = require('express');
const router = express.Router();
const query = require('../query');

router.route("/")
    .get(async(req, res, next) => {
        res.render('main/index');
    })

module.exports = router;