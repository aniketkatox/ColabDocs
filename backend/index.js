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

const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

ShareDB.types.register(richText.type);
const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
const shareDB = new ShareDB({db});

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		try{
			const parsedMessage = JSON.parse(message);
			if (parsedMessage.hasOwnProperty('documentId')) {
				var stream = new WebSocketJSONStream(ws);
				shareDB.listen(stream);
			}
		}
		catch(error){
			console.error('Error parsing JSON:', error.message);
		}		
	});
});

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL;

//connecting to mongoDB
mongoose.connect(MONGO_URL)
.then(()=> console.log('Connection is Successful to database'))
.catch(err=> console.error('Could not connect to mongodb',err))

const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.102:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

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

app.get('/',(req,res)=>{
    res.json({hii: "hii my self aniket"});
})

const port = 3001
// const port = 8080
server.listen(port , ()=> console.log(`Listening on port ${port}...`))