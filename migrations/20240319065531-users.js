// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { faker } = require('@faker-js/faker/locale/ru');

module.exports = {
  async up(db) {
    return db.collection('users').insertMany(
      // [
      //   ...Array(10),
      // ].map(() => {
      //   const firstName = faker.person.firstName();
      //   const lastName = faker.person.lastName();
      //   const middleName = faker.person.middleName();

      //   return {
      //     firstName,
      //     lastName,
      //     middleName,
      //     fullName: `${lastName} ${firstName} ${middleName}`,
      //     birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      //     phone: faker.phone.number('+7 ### ###-##-##'),
      //     gender: faker.person.sex(),
      //   };
      // })

      [{
        "firstName": "Салам",
        "lastName": "Иванова",
        "middleName": "Пока",
        "fullName": "Иванова Салам Пока",
        "birth": "1965-08-14",
        "phone": "+7 658 421 0920",
        "gender": "male"
    },
    {
        "firstName": "Спартак",
        "lastName": "Зенит",
        "middleName": "Рубин",
        "fullName": "Зенит Спартак Рубин",
        "birth": "1972-10-21T02:30:19.587Z",
        "phone": "+7 267 999 7341",
        "gender": "female"
    },
    {
        "firstName": "Платон",
        "lastName": "Jacobs",
        "middleName": "Gray",
        "fullName": "Jacobs Платон Gray",
        "birth": "1971-12-22T07:51:40.596Z",
        "phone": "+7 868 123-51-71",
        "gender": "male"
    },
    {
        "firstName": "Валерий",
        "lastName": "Spencer",
        "middleName": "Riley",
        "fullName": "Spencer Валерий Riley",
        "birth": "1967-06-07T18:58:01.223Z",
        "phone": "+7 006 443-32-04",
        "gender": "male"
    }]
    );
  },

  async down(db) {
    return db.collection('users').updateMany([]);
  },
};
