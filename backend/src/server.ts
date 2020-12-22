import express from 'express';
import path from 'path';

import routes from './routes';
import './database/connection';
import 'express-async-errors';
import errorHandler from './errors/handler'

const server = express();

server.use(express.json());
server.use(routes);

server.use('/upload',express.static(path.join(__dirname,'..','upload')));
server.use(errorHandler);

server.listen(3333, ()=>{
    console.log('server online on port 3333 ');
});
