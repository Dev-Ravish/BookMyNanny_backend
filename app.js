require('dotenv').config();
require('global');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const nannyRoutes = require('./routes/nanny');

//CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB CONNECTED');
  });

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', nannyRoutes);

//PORT listening
app.listen(port, () => {
  console.log(`app is listening to ${port}`);
});
