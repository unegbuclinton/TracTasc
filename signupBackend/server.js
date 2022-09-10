const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATA_BASE_ACCESS, () =>
  console.log('Database connected')
);

const app = express();

app.use(express.json());
app.use(cors());
routes(app);

app.listen(4000, () => console.log('Server is listening......'));
