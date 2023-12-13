var express         = require('express'),
    cookieParser    = require('cookie-parser'),
    dotenv          = require('dotenv').config(),
    cors            = require('cors'),
    dbConfig        =  require('./config/dbconfig'),
    apiRouter        = require('./routes/api');
const app = express();
var httpServer = require('http').Server(app);


app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(async function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, application/json, text/plain',
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.set(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
  )
  next()
});

app.use(apiRouter)

// set the app to listen on the port
const port = process.env.PORT || 6000
var server = httpServer.listen(port, () => {
  console.log('Backend Server is running on port', server.address().port)
})