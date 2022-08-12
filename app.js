const express = require( 'express' );
const app = express();
const dotenv = require( 'dotenv' );
const connectDB = require( './config/db' );
const Task = require( './models/Task' )
const PORT = process.env.PORT || 5000;

// Load config
dotenv.config( { path: './config/config.env' } );

// Embeded JavaScript
app.set( 'view engine', 'ejs' );

// Allows you to serve files from the public folder
app.use( express.static( 'public' ) );

// Express Middleware
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

// Connects to the Database using Mongoose
connectDB()

// GET request (Read)
// Grabs documents out of collection and renders them to the DOM
app.get( '/', async ( req, res ) => {
    // todoItems contains an array of objects, objects being documents from the collection 'todos'
    const todoItems = await Task.find().exec();
    // itemsLeft contains a number, number being total number of documents in the todos collection with the completed key with a value of false
    const itemsLeft = await Task.count({ completed: false })
    // sends todoItems and itemsLeft to the ejs template
    res.render( 'index.ejs', { items: todoItems, left: itemsLeft} );
});

// POST request (Create)
// Adds a task to the collection and refreshes the page
app.post( '/addTodo', async ( req, res ) =>  {
    // inserts a task (grabbed from form in the ejs) into the collection
    new Task( { task: req.body.todoItem, completed: false } ).save()
    console.log( 'New task added' );
    // Redirects to the '/' route which triggers a GET request.
    res.redirect( '/' );
})
// PUT request (Update)
// Changes the completed flag to true on a task.
app.put( '/markComplete', async ( req, res ) => {
    // finds document by id and updates with 2nd argument, 
    await Task.findByIdAndUpdate( req.body.id , {
        completed: true
    },{
        sort: {_id: -1},
        upsert: false
    });
    // then sends a response to client.
    res.json('Marked Complete')
})
// PUT request (Update)
// Changes the completed flag to true on a task.
app.put( '/markIncomplete', async ( req, res ) => {
    await Task.findByIdAndUpdate( req.body.id , {
        completed: false
    },{
        sort: {_id: -1},
        upsert: false
    });
    res.json('Marked Incomplete')
})
// DELETE request (Delete)
// Deletes a task from the collection (Delete)
app.delete( '/deleteItem', async( req,res ) => {
    await Task.findByIdAndDelete( req.body.id );
    console.log( 'Task removed.' );
    await res.json( 'Task removed.' );
})

//
app.listen( PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})