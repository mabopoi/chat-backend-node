const express = require('express');
const passport = require('passport');
const UserService = require('../services/UserService');
require('../authStrategies/local');

function authRoutes(app) {
  const router = express.Router();
  app.use('/auth', router);

  router.post('/sign-up', async (req, res) => {
    const { body } = req;
    const newUser = await UserService.post(body);
    if (newUser) return res.sendStatus(201);
  });

  router.post('/sign-in', passport.authenticate('local'), (req, res) => {
    const { name, email } = req.user;
    const loggedUser = { user: { name, email } };
    res.statusCode = 200;
    return res.json(loggedUser);
  });

  router.get('/verify', (req, res) => {
    const user = req.user ?? null;
    if (user) {
      res.statusCode = 200;
      return res.json(user);
    }
    res.statusCode = 401;
    return res.json({ data: 'You are not logged' }).end();
  });

  router.get('/log-out', (req, res) => {
    req.logOut();
    return res.sendStatus(200).end();
  });
}

module.exports = authRoutes;
