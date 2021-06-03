var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

const db = new sqlite3.Database('userdata.db');

/* GET index page. */
router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all("SELECT * from userdata", (err, rows) =>{
      if (!err) {
        let data = {
          title: 'ユーザー 一覧',
          content: rows
        };
        res.render('index', data)
      }
    });
  });
});

module.exports = router;
