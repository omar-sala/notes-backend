const logger = (req, res, next) => {
  console.log('New Request:', req.method, req.url)
  next()
}

module.exports = logger
