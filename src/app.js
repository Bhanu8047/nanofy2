const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const hbs = require('hbs')
const { _404_ } = require('./controllers/404.controller')
const { error } = require('./controllers/error.controller')
const db = require('./db/mongo')

// env Config
require('dotenv').config()

const app = express()
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// serving static files
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('/', async (req, res, next) => {
    try {
        await db
        res.json({
            success: true,
            _message: 'Successfully running API & connected to db'
        }).status(200)
    } catch (error) {
        next(error)
    }
})

app.use(require('./routes/url'))
app.use(error)
app.all('*',_404_)

module.exports = app