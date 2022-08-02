require('@babel/register');
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const homeRoute = require('./routes/homeRoute');
const trackRoute = require('./routes/trackRoute');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(`${__dirname}/Logs/`, 'access.log'), { flags: 'a' });
const config = (application) => {
  application.use(express.static(path.join(process.env.PWD, 'public')));
  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
  application.use(morgan('combined', { stream: accessLogStream }));
};

config(app);
app.use('/', homeRoute);
app.use('/tracks', trackRoute);

morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' '));

app.listen(3000, () => {
  console.log('server is up, port 3000');
});
