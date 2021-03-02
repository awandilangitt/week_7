module.exports = function deleteusers(req, res, next) {
    try {
      if (!req.query.id) {
        throw new Error("id users is not defined");
      }
  
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  