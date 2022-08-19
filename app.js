const express = require('express');
const app = express();
const connectDB = require('./config/db');
const Task = require('./models/Task')
const taskRoutes = require('./routes/tasksRouter')
const PORT = process.env.PORT || 5000;

// Load config
require('dotenv').config({ path: './config/config.env' });

// Embeded JavaScript
app.set('view engine', 'ejs');

// Allows you to serve files from the public folder
app.use(express.static('public'));

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connects to the Database using Mongoose
connectDB()

app.use('/',taskRoutes);
// // app.get('/day=:day', async(req, res) => {
// //     const day = req.params.day
// //     const selectedDate = await dayjs().subtract(parseInt(day), 'day');
// //     const todoItems = await Task.find({ date: selectedDate.format('DDMMYY') }).exec();
// //     const itemsLeft = await Task.count({ completed: false, date: selectedDate.format('DDMMYY') })
// //     res.render('index.ejs', { 
// //         items: todoItems, 
// //         left: itemsLeft, 
// //         date: selectedDate,
// //         dayjs: dayjs,
// //         day: parseInt(day)+1
// //     });

// // })
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})