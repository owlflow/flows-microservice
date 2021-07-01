module.exports.debug = function () {
  if (process.env.DEBUG === 'true') {
    console.log.apply(console, arguments)
  }
}
