require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const auth_ctrl = require('./controllers/auth_controller')
const data_ctrl = require('./controllers/data_controller')
const app = express()

app.use(express.json())
app.use(express.static( `${__dirname}/../build` ) );
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        max_age: 60 * 60 * 1000
    }
}))

app.post('/auth/login', auth_ctrl.login)
app.post('/auth/register', auth_ctrl.register)
app.get('/auth/data', auth_ctrl.getData)
app.get('/auth/logout', auth_ctrl.logout)
app.get('/data/search', data_ctrl.getAllPosts)
app.get('/data/post/:id', data_ctrl.getPostById)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('database set')
})

app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
})