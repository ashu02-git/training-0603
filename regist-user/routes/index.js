var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

const db = new sqlite3.Database('userdata.db');
const inputValidator = require('../middleware/inputValidator');

/* GET index page. */
router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all('SELECT * FROM userdata', (err, rows) => {
      if (!err) {
        let data = {
          title: 'ユーザー 一覧',
          content: rows,
        };
        res.render('index', data);
      }
    });
  });
});

/* GET add page. */
router.get('/add', (req, res, next) => {
  res.render('add', { title: 'ユーザー新規登録' });
});

/* POST Add UserData */
router.post('/add', inputValidator, (req, res, next) => {
  let name = req.body.name;
  let age = req.body.age;

  db.serialize(() => {
    db.exec(
      `INSERT INTO userdata (name, age) VALUES("${name}","${age}")`,
      (error, stdout, stderr) => {
        if (!error) {
          res.redirect('/');
        } else {
          console.log(`stdout: ${stderr}`);
        }
      }
    );
  });
});

/* get edit page */
router.get('/edit/:id', (req, res, next) => {
  const id = req.params.id;

  db.serialize(() => {
    db.get('SELECT * FROM userdata WHERE id = ?', [id], (error, rows) => {
      if (!error) {
        let data = {
          title: 'ユーザー編集',
          myData: rows,
        };
        res.render('edit', data);
      }
    });
  });
});
/* post edited data */
router.post('/edit/:id', inputValidator, (req, res, next) => {
  const id = req.params.id;
  let name = req.body.name;
  let age = req.body.age;

  db.serialize(() => {
    db.exec(
      `UPDATE userdata SET name="${name}", age="${age}" WHERE id = "${id}"`,
      (error, stdout, stderr) => {
        if (!error) {
          res.redirect('/');
        } else {
          console.log(`stdout: ${stderr}`);
        }
      }
    );
  });
});

/* delete UserData */
router.get('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  db.serialize(() => {
    db.exec(
      `DELETE FROM userdata WHERE id = "${id}"`,
      (error, stdout, stderr) => {
        if (!error) {
          res.redirect('/');
        } else {
          console.log(`stdout: ${stderr}`);
        }
      }
    );
  });
});

module.exports = router;
