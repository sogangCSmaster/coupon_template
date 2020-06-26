const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const methodOverride = require('method-override');
const config = require('./config.json')
const port = 80;


app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(cors());

app.use(session({
    secret: 'askdfhwehifubsd23fsdkj23',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore({
        host: config.host,
        port: 3306,
        user: config.user,
        password: config.password,
        database: config.database
    })
}))

app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ extended: true, limit: '30mb' }));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

const main = require('./routes/main');
app.use(main);
const admin = require('./routes/admin');
app.use(admin);
const issue = require('./routes/issue');
app.use(issue);
const franchise = require('./routes/franchise');
app.use(franchise);
const used = require('./routes/used');
app.use(used);

app.use((req,res,next) => {
    res.locals.inspector = config.inspector;
    res.locals.session = req.session;
    next();
});

app.get("*", (req, res ,next) => {
    res.status(404).send('404 Error');
})
  
app.get("*", (err, req, res, next) => {
    res.status(500).send('Internal Server Error!')
})

app.listen(port, () => {
    console.warn(`server running at port ${port}`);
});