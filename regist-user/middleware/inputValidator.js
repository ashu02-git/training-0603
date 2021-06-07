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
    const { name, age } = req.body;
    if (req.path === '/add') {
      res.render('add', { errorMessageList, name, age });
    } else {
      const id = req.params.id;
      res.render('edit', { errorMessageList, id, name, age });
      console.log(req.params.id);
    }
  } else {
    next();
  }
};

module.exports = inputValidator;
