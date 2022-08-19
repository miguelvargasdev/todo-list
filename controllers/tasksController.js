const Task = require('../models/Task');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') 

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/New_York');


module.exports = {
    
    // GET request (Read)
    // Grabs documents out of collection and renders them to the DOM
    getTasks: async (req, res) => {
        try{
            const selectedDate = await dayjs().format('MMM DD, YYYY');
            // todoItems contains an array of objects, objects being documents from the collection 'dateToday'
            const todoItems = await Task.find({ date: dayjs().tz("America/New_York").format('DDMMYY') });
            // itemsLeft contains a number, number being total number of documents in the todos collection with the completed key with a value of false
            const itemsLeft = await Task.count({ completed: false, date: dayjs().format('DDMMYY') })
            // sends todoItems and itemsLeft to the ejs template
            res.render('index.ejs', { 
                items: todoItems, 
                left: itemsLeft, 
                date: selectedDate,
                dayjs: dayjs,
                day: 1
            });

        }catch(err){
            console.log(err);
        }
    },
    // POST request (Create)
    // Adds a task to the collection and refreshes the page
    createTask: async (req, res) => {
        try{
            // inserts a task (grabbed from form in the ejs) into the collection
            new Task({ task: req.body.task, completed: false }).save()
            console.log('New task added');
            // Redirects to the '/' route which triggers a GET request.
            res.redirect('/');
        }catch(err){
            console.log(err);
        }
    },
    // PUT request (Update)
    // Changes the completed flag to true/false on a task,
    toggleComplete: async (req, res) => {
        try{
            // if the class completed is found in the class list
            if(Object.values(req.body.classList).includes("completed")){
                await Task.findByIdAndUpdate(req.body.id, {
                    //change completed flag to false.
                    completed: false
                });
                // then send a response to client.
                res.json('Marked Incomplete');
            }else{
                await Task.findByIdAndUpdate(req.body.id, {
                    //change completed flag to true.
                    completed: true
                });
                // then send a response to client.
                res.json('Marked Complete')
            }
        }catch(err){
            console.log(err);
        }
    },
    // DELETE request (Delete)
    // Deletes a task from the collection (Delete)
    deleteTask: async (req, res) => {
        console.log(req.body.id)
        await Task.findByIdAndDelete(req.body.id);
        await res.json('Task removed.');
    }
}