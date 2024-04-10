// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');


module.exports = {
  async up(db) {
    const password = await bcrypt.hash('12345678', 3)
    return db.collection('employees').insertMany([
      {
        username: 'Админ',
        role: 'Admin',
        email: 'snakeadel00@gmail.com',
        refreshToken: null,
        password
      },
    ]);
  },

  async down(db) {
    return db.collection('employees').updateMany([]);
  },
};
