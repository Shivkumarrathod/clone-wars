import express from 'express'
import path from 'path'

import userRoute from './routes/userRoutes.js'


const app = express();
const port = 8080;


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/x/users',userRoute)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});