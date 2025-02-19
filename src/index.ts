import express from 'express';

import protectedHandler from './protected/protected-handler';
import authentication from './middleware/authentication';

import dotenv from 'dotenv';

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080;

app.get('login');
app.get('logout');

app.get('/protected', authentication.authMiddleware, protectedHandler.handleGetRequest);

app.listen(PORT, () => {
    console.log('The server is up and running, listening on PORT:' + PORT)
});