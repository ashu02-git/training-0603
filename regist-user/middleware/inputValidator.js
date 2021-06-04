const inputValidator = (req, res, next) => {
  let nameLength = req.body.name.length;
  let ageLength = req.body.age.length;
  let error = true;

  if (nameLength != 0 && ageLength != 0) {
    error = false;
  }

  if (error) {
    console.log('error');
    res.render('add', { title: 'error' });
  } else {
    next();
  }
};

module.exports = inputValidator;
