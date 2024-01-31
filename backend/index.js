const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session');
const cors = require('cors')
const http = require('http');
const WebSocket = require('ws');
const cookieParser = require('cookie-parser')
const ShareDB = require('sharedb');
const richText = require('rich-text');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const { Document } = require('./Models/documentModel');

const users = require('./Routes/users')
const documents = require('./Routes/documents');
const documentDirectory = require('./Routes/documentDirectory');

const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

ShareDB.types.register(richText.type);
var backend = new ShareDB();

wss.on('connection', (ws) => {
        var connection = backend.connect();
        var doc = connection.get('documents', 'rich-text');
        doc.fetch(function(err) {
            if (err) throw err;
            if (doc.type === null) {
                doc.create([{insert: 'hi!'}], 'rich-text');
            }
        });

        var stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
});

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL;

//connecting to mongoDB
mongoose.connect(MONGO_URL)
.then(()=> console.log('Connection is Successful to database'))
.catch(err=> console.error('Could not connect to mongodb',err))


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

const crypto = require('crypto');

// Generate a random string of 32 characters
const generateRandomString = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Use the generated string as your secret key
const secretKey = generateRandomString();

console.log('Generated secret key:', secretKey);

//Session middleware
app.use(
    session({
      secret: secretKey, // Secret key for session encryption
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // Session duration in milliseconds (1 day)
      },
    })
);

app.use('/users',users)
app.use('/documents', documents);
app.use('/',documentDirectory);


app.get('/',(req,res)=>{
    res.json({hii: "hii my self aniket"});
})

const port = 3001
// const port = 8080
server.listen(port , ()=> console.log(`Listening on port ${port}...`))