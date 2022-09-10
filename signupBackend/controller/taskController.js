const {
  createTaskData,
  getAllTasks,
  getDailyTasks,
  delTask,
  dailyDoneTasks,
  doneTasks,
  updateTaskData,
} = require('../services/taskServices');

module.exports.createTask = (req, res) => {
  const createTask = req.body;

  createTaskData(createTask, req.user_id)
    .then((task) => {
      res.json({
        task,
        message: 'Task Created sucessfully',
      });
    })
    .catch((err) => {
      res.json({
        err,
        error: 'An error occured',
      });
    });
};

module.exports.getTaskDatas = (req, res) => {
  getAllTasks(req.user_id)
    .then((result) => {
      res.json({
        result,
      });
    })
    .catch((err) => {
      res.json({
        err,
        messgae: 'Encountered an error',
      });
    });
};

module.exports.getTodayTasks = (req, res) => {
  getDailyTasks(req.user_id)
    .then((result) => {
      res.json({
        result,
      });
    })
    .catch((err) => {
      res.json({
        err,
        messgae: 'Encountered an error',
      });
    });
};

module.exports.getDoneTasks = (req, res) => {
  doneTasks(req.user_id)
    .then((result) => {
      res.json({
        result,
      });
    })
    .catch((err) => {
      res.json({
        err,
        messgae: 'Encountered an error',
      });
    });
};

module.exports.getDailyDoneTasks = (req, res) => {
  dailyDoneTasks(req.user_id)
    .then((result) => {
      res.json({
        result,
      });
    })
    .catch((err) => {
      res.json({
        err,
        messgae: 'Encountered an error',
      });
    });
};

module.exports.updateTask = (req, res) => {
  const updateTask = req.body;
  const id = req.params.id;

  updateTaskData(updateTask, id)
    .then((task) => {
      res.json({
        task,
        message: 'Task Updated sucessfully',
      });
    })
    .catch((err) => {
      res.json({
        err,
        error: 'An error occured',
      });
    });
};

module.exports.deleteTask = (req, res) => {
  const id = req.params.id;
  delTask(id)
    .then((result) => {
      res.json({
        result,
        message: 'Deleted Sucessfully',
      });
    })
    .catch((err) => {
      res.json({
        err,
        messgae: 'Encountered an error',
      });
    });
};
