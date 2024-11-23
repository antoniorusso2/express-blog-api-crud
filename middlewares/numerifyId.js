function numerifyId(req, res, next) {
  if (req.params.id) {
    req.params.id = parseInt(req.params.id);
    console.log(req.params.id);
  }

  next();
}

module.exports = numerifyId;
