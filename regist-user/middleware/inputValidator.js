const inputValidator = (req, res, next) => {
  const { name, age } = req.body;
  const errorMessageList = [];

  if (name.length === 0) {
    errorMessageList.push('名前が未記入です。');
  }

  if (age.length === 0) {
    errorMessageList.push('年齢が未記入です。');
  }

  if (age < 0) {
    errorMessageList.push('年齢にマイナスが入力されています。');
  }

  if (errorMessageList.length > 0) {
    if (req.path === '/add') {
      res.render('add', { errorMessageList });
      console.log(errorMessageList);
    } else {
      res.render('edit', { errorMessageList, userData: req.params });
    }
  } else {
    next();
  }
};

module.exports = inputValidator;
