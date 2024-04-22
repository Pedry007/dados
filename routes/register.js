const router = require('express')['Router']();

router.get('/', (req, res) => {
  res.render('register', { message: '' });
}).post('/', async (req, res) => {
  const db = req.app.locals.db;
  
  if (db.get('users').find({ email: req.body.email }).value()) {
    res.render('register', { message: 'e-mail existente' });
  } else if (db.get('users').find({ username: req.body.username }).value()) {
    res.render('register', { message: 'usuário existente' });
  } else {
    const user = { email: req.body.email, username: req.body.username, password: req.body.password };

    db.get('users').push(user).write();

    req.session.user = user;
    res.redirect('/user');
  }
});

module.exports = router;