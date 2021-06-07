const inputValidator = (req, res, next) => {
  let nameLength = req.body.name.length;
  let age = req.body.age;
  let nameFlag = false;
  let ageFlag = false;

  if (nameLength === 0) nameFlag = true;
  if (age.length === 0 || age < 0) ageFlag = true;

  if (nameFlag || ageFlag) {
    if (req.path === '/add') {
      res.render(req.path.slice(1), { title: 'Error', nameFlag, ageFlag });
    } else {
      res.render('edit', {
        title: 'Error',
        myData: req.params,
        nameFlag,
        ageFlag,
      });
    }
  } else {
    next();
  }
};

module.exports = inputValidator;
