const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT;
const app = express();
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', (req, res) => {
  // Requires authentication
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).send('Not logged in');
  }
  res.send(JSON.stringify(req.oidc.user));
});

app
  .use(cors())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    //console.log(`Connected to DB and listening on ${port}`);
  }
});

module.exports = app;