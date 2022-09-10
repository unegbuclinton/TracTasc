const taskModel = require('../models/tasksModel');

module.exports.createTaskData = (createTask, user_id) => {
  const newTask = new taskModel({
    task: createTask.task,
    description: createTask.description,
    date: createTask.date,
    user: user_id,
  });
  return newTask.save();
};

module.exports.updateTaskData = (updateTask, _id) => {
  return taskModel.findByIdAndUpdate(_id, updateTask);
};
module.exports.getAllTasks = (user_id) => {
  return taskModel.find({ user: user_id });
};

module.exports.doneTasks = (user_id) => {
  return taskModel.find({ user: user_id, status: true });
};

module.exports.getDailyTasks = (user_id) => {
  const today = new Date();
  today.setHours(1, 0, 0, 0);

  return taskModel.find({ user: user_id, date: today.toISOString() });
};

module.exports.dailyDoneTasks = (user_id) => {
  const today = new Date();
  today.setHours(1, 0, 0, 0);

  return taskModel.find({
    user: user_id,
    date: today.toISOString(),
    status: true,
  });
};

module.exports.delTask = (id) => {
  return taskModel.findByIdAndDelete(id);
};
