const updateTask = (req, res, Projects) => {
  const requiredTaskFields = ['taskName', 'recordedTime'];

  for (let i = 0; i < requiredTaskFields.length; i++) {
    const field = requiredTaskFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400)
        .send(message);
    }
  }

  const recordedTime = req.body.recordedTime < 0 ? 0 : req.body.recordedTime;
  const toUpdate = {
    'tasks.$.taskName': req.body.taskName,
    'tasks.$.recordedTime': recordedTime,
    'tasks.$.log': req.body.log,
  };

  Projects
    .findOneAndUpdate(
      { _id: req.params.id, 'tasks._id': req.params.taskId },
      { $set: toUpdate },
      { new: true },
    )
    .exec()
    .then((proj) => {
      return res.status(204).end();
    })
    .catch((err) => {
      return res.status(500)
        .json({ message: 'Internal server error', error: err });
    });
};

module.exports = updateTask;
