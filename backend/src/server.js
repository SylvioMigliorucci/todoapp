import app from './app';

const port = process.env.APP_SERVER_PORT || 3333;

app.listen(port);
