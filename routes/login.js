const router = require('express')['Router']();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/user');
    } else {
        res.render('login', { message: '' });
    };
}).post('/', async (req, res) => {
    const db = req.app.locals.db;
    const user = db.get('users').find({ email: req.body.email }).value();

    if (user) {
        if (user.password === req.body.password) {
            req.session.user = user;
            res.redirect('/user');
        } else {
            res.render('login', { message: 'senha incorreta' });
        };
    } else {
        res.render('login', { message: 'não encontrado' });
    };
});

module.exports = router;