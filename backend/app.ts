import express from 'express';
import router from './src/routes/router';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json()); // ? parse JSON bodies
app.use(express.urlencoded({ extended: true })); // ? allow req.body

app.use('/', router);
app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
