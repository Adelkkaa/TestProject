module.exports = {
  async up(db) {
    // Получаем список пользователей
    const users = await db.collection('users').find({}).toArray();

    // Создаем задачи для каждого пользователя
    const tasks = users.map(user => ({
      user: user,
      name: 'Пример задачи',
      date_start: new Date(),
      date_end: new Date().setDate(new Date().getDate() + 7), // Задача на 7 дней вперед
    }));

    // Вставляем задачи в коллекцию tasks
    return db.collection('tasks').insertMany(tasks);
 },

  async down(db) {
    return db.collection('tasks').updateMany([]);
  },
};
