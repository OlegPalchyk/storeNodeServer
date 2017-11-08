import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


//db
import mongoose from 'mongoose';

import routes from './routes/routes';

let isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    mongoose.connect('mongodb://heroku_gx2dbf51:hpkf9csid3v52b59v55c6mva88@ds235785.mlab.com:35785/heroku_gx2dbf51');
} else {
    mongoose.connect('mongodb://localhost:27017/storeApp');
    console.log('db connected');
    mongoose.set('debug', true);
}

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected')
});


const app = express();

app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../../', 'client/build')));
app.use('/upload',express.static(__dirname + '/upload'));

routes(app);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../../', 'client/build', 'index.html'));
});


export default app;
