const inputValidator = (req, res, next) => {
  let nameLength = req.body.name.length;
  let age = req.body.age;
  let nameFlag = false;
  let ageFlag = false;

  if (nameLength === 0) {
    nameFlag = true;
  }

  if ((age.length === 0) || (age < 0)) {
    ageFlag = true;
  } 

  if (nameFlag || ageFlag) {

    res.render('add', {
      title: 'Error',
      nameFlag: nameFlag,
      ageFlag: ageFlag,
    });
  } else {
    next();
  }
};

module.exports = inputValidator;
