const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

require('./database/connection');

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'uibnsultan78',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

let index = require('./routes/index.route');
let user = require('./routes/user.route');

//ROUTING
app.use('/', index);
app.use('/user', user);

app.listen(3001)