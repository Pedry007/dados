const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');

const app = express();
app.locals.db = low(new fileSync('db.json')).defaults({ users: [] });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


fs.readdirSync('./routes').filter((file) => file.endsWith('.js')).forEach((route) => {
    app.use(`/${route.split('.')[0]}`, require(`./routes/${route}`));
});

app.get('/', async (req, res) => {
    res.redirect('/login');
});

app.post('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


app.set('port', process.env.PORT || 5500);
app.listen(app.get('port'), '0.0.0.0', async () => {
    // const response = await fetch('http://ip-api.com/json');
    // const { status, query } = await response.json();
    // console.log(`Rodando na porta ${status === 'success' ? query : ip.address()}:${app.get('port')}`);
});