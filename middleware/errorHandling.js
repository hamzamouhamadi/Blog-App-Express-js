// middleware/errorHandling.js
const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
  };
  
module.exports = errorHandlingMiddleware;
  