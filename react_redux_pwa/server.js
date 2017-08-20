const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment')

const app = express();

const todoModel = require('./models/todo')  //todo model

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// MONGOOSE CONNECT
// ===========================================================================
mongoose.connect('mongodb://localhost:27017/local',{ useMongoClient: true,})

var db = mongoose.connection
db.on('error', ()=> {console.log( '+++NODE SERVER+++ FAILED to connect to mongoose')})
db.once('open', () => {
	console.log( '+++NODE SERVER+++ connected to mongoose')
})

autoIncrement.initialize(db)

// console.dir(todoModel['schema'])
todoModel.schema.plugin(autoIncrement.plugin, { model: 'ToDo', field: 'itemId' })

// ROUTES FOR OUR API
// ===========================================================================
var router = express.Router()

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('+++NODE SERVER+++ entering the middleware');
    next(); // make sure we go to the next routes and don't stop here
});

// Get All Items
// --------------------
router.route('/')
		.get((req,res)=>{
			todoModel.find({},null,{sort:{'created_at':-1}},(err,result)=>{
				if (err){res.json({message:"---TODO--- GET Failed!!",err:err})}
				else res.json(result)
			})
			});
			
// Add an Item
// ------------
router.route('/additem')
		.post((req,res)=>{
			var todoItem = new todoModel({
				item:req.body.item,
				completed: req.body.completed
			})

			todoItem.save((err,result)=> {
				if (err) {res.send("---TODO--- todoItem save failed " + err)}
				else res.json(result)
			})
		});

// Mark an item Complete/Incompleted
// ----------------------------------
router.route('/update-complete-flag/:id')
		.post((req,res)=>{
			todoModel.findByIdAndUpdate(req.params.id, { $set: { completed: !req.body.todo.completed }}, {new:true}, (err,result)=>{
				if (err) {res.send("---TODO--- todoItem Update Complete flag failed " + err)}
				else res.json(result)
			})
	  });

// further routes goes here

app.use('/api',router)

app.listen(3000,()=> {console.log("+++NODE SERVER+++ Express Running on PORT:3000!!!")})