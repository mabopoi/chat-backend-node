require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL,
  cookieSecret: process.env.COOKIE_SECRET,
};

module.exports = { config };
