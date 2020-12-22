const bcrypt = require('bcrypt');

export async function hashPassword(password, saltRounds = 10) {
  return bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });
}
