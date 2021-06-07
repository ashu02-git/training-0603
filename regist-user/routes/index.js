let express = require('express');
let router = express.Router();
let sqlite3 = require('sqlite3');

const db = new sqlite3.Database('userdata.db');
const inputValidator = require('../middleware/inputValidator');
const errorMessageList = [];

/* GET index page. */
router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all('SELECT * FROM userdata', (err, usersData) => {
      if (!err) {
        res.render('index', { usersData });
      }
    });
  });
});

/* GET add page. */
router.get('/add', (req, res, next) => {
  res.render('add', { errorMessageList });
});

/* POST Add UserData */
router.post('/add', inputValidator, (req, res, next) => {
  let { name, age } = req.body;

  db.serialize(() => {
    db.exec(
      `INSERT INTO userdata (name, age) VALUES("${name}","${age}")`,
      (error, stdout, stderr) => {
        !error ? res.redirect('/') : console.log(`stdout: ${stderr}`);
      }
    );
  });
});

/* get edit page */
router.get('/edit/:id', (req, res, next) => {
  const id = req.params.id;

  db.serialize(() => {
    db.get('SELECT * FROM userdata WHERE id = ?', [id], (error, userData) => {
      if (!error) {
        res.render('edit', { userData, errorMessageList });
      }
    });
  });
});
/* post edited data */
router.post('/edit/:id', inputValidator, (req, res, next) => {
  const id = req.params.id;
  let { name, age } = req.body;

  db.serialize(() => {
    db.exec(
      `UPDATE userdata SET name="${name}", age="${age}" WHERE id = "${id}"`,
      (error, stdout, stderr) => {
        !error ? res.redirect('/') : console.log(`stdout: ${stderr}`);
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
        !error ? res.redirect('/') : console.log(`stdout: ${stderr}`);
      }
    );
  });
});

module.exports = router;
