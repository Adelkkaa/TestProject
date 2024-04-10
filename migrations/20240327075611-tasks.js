module.exports = {
  async up(db) {
    // Получаем список пользователей
    const users = await db.collection('users').find({}).toArray();

    // Создаем задачи для каждого пользователя
    const tasks = users.map(user => ({
      user: user,
      name: 'Пример задачи',
      date_start: new Date(),
      date_end: new Date(new Date().setHours(new Date().getHours() + 2)), // Задача на 2 часа вперед
    }));


    // Вставляем задачи в коллекцию tasks
    return db.collection('tasks').insertMany(tasks);
 },

  async down(db) {
    return db.collection('tasks').updateMany([]);
  },
};
