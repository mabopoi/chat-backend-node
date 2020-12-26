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

  router.post(
    '/sign-in',
    passport.authenticate('local', { session: false }),
    (req, res) => {
      res.sendStatus(200);
    }
  );
}

module.exports = authRoutes;
