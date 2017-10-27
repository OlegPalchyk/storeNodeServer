import express from 'express';
import path from'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//routes
import passwords from './routes/passwords';

const app = express();

app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../../', 'client/build')));

// Answer API requests.
app.use("/api", passwords);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../', 'client/build', 'index.html'));
});



export default app;
