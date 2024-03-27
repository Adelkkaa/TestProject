// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker/locale/ru');

module.exports = {
  async up(db) {
    return db.collection('users').insertMany(
      [
        ...Array(10),
      ].map(() => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const middleName = faker.person.middleName();

        return {
          firstName,
          lastName,
          middleName,
          fullName: `${lastName} ${firstName} ${middleName}`,
          birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
          phone: faker.phone.number('+7 ### ###-##-##'),
          gender: faker.person.sex(),
        };
      })
    );
  },

  async down(db) {
    return db.collection('users').updateMany([]);
  },
};
