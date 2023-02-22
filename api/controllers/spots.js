const spotsRouter = require('express').Router()

spotsRouter.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

module.exports = spotsRouter
