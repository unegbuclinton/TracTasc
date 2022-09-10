const authenticate = require('../middlewares/authenticate.');

module.exports = function (app) {
  const {
    createUser,
    getRes,
    singleUser,
    deleteUser,
    loginUser,
  } = require('../controller/userController');

  const {
    createTask,
    getTaskDatas,
    getTodayTasks,
    updateTask,
    getDailyDoneTasks,
    deleteTask,
    getDoneTasks,
  } = require('../controller/taskController');

  app.route('/app/signup').post(createUser);

  app.route('/app/login').post(loginUser);

  app.route('/app/task').post(authenticate, createTask);

  app.route('/app/tasks/:id').patch(updateTask);

  app.route('/app/tasks').get(authenticate, getTaskDatas);

  app.route('/app/dayTasks').get(authenticate, getTodayTasks);

  app.route('/app/dayDoneTasks').get(authenticate, getDailyDoneTasks);

  app.route('/app/doneTasks').get(authenticate, getDoneTasks);

  app.route('/app/tasks/:id').delete(deleteTask);

  app.route('/').get(getRes);

  app.route('/:id').get(singleUser);

  app.route('/delete/:id').delete(deleteUser);
};
