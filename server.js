const { createServer } = require('http')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')

const normalizePort = port => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || 3000)

const app = express()
const dev = app.get('env') !== 'production'

if (!dev) {
  app.disable('x-powered-by')
  // @ts-ignore
  app.use(compression())
  // @ts-ignore
  app.use(morgan('common'))

  app.use(express.static(path.resolve(__dirname, 'build')))

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

if (dev) {
  // @ts-ignore
  app.use(morgan('dev'))
}

const server = createServer(app)

server.listen(PORT, err => {
  if (err) throw err
  console.log('server started on port ' + PORT);
})