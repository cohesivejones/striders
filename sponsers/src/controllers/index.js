const Sponser = require('../models');

exports.all = function (req, res, next) {
  Sponser.find({}, function (err, sponsers) {
    if (err) return next(err);
    res.send(sponsers);
  })
};

exports.create = async function (req, res, next) {
  try {
    const {id, parentId} = req.body
    let sponser = new Sponser({id, parentId});
    sponser = await sponser.save()
    res.send(sponser);
    next();
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
    try {
      const id = req.params.id;
      await Sponser.remove({id})
      res.send('Sponser deleted successfully');
      next();
    } catch (err) {
      next(err);
    }
};
