const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const session = require('express-session')


// utils
const User = require('./utils/user')

const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    name: "MySession",
    secret: 'keyboard cat',
    cookie: {
        path: '/',
        maxAge: 10000,
        httpOnly: true,
        secure: 'auto',
        sameSite: 'lax'

    },
    resave: false,
    // rolling: true,
    saveUninitialized: false,
    unset: 'destroy',
}))

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Path
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'))
})

app.post('/login', (req, res) => {
    console.log(req.body)
    // console.log(req.session)

    if(req.body.username === 'admin' && req.body.password === 'admin') {
        req.session.regenerate(err => {
            if (err) {console.error('Cannot create session')}
            // console.log(req.session)
            req.session.user = req.body.username
            res.redirect('/chat')
        })
    } else {
        res.redirect('/login')
    }   
})

app.get('/chat', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    } else {
        res.redirect('/login')
    }
    // console.log(req.session)
    // res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Run when client connect
io.on('connection', (socket) => {
    console.log("New client connected")
    user = new User(socket.id, 'hannan')

    // Incoming new message
    socket.on('newMessage', (message) => {
        console.log(`Message sent: ${message}` )
        io.emit('receiveMessage', message)
    })

    // Client disconnect
    socket.on('disconnect', () => {
        console.log("Client disconnect")
    })
})

// Run server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))