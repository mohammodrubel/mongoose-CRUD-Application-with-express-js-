const express = require('express')
const mongoose = require('mongoose')
const todoHendeler = require('./RouteHandler/todoHendeler')
// const mongoose = mongoose.Types.objectId(req.params.id)



const app = express()
app.use(express.json())

//Database connection with mongoose

mongoose.connect('mongodb://localhost/todos')
.then(()=>console.log('database connection successfully'))
.catch(err => console.log(err))


//Route 
app.use('/todo',todoHendeler)

// error Hendeler 

function errorHandeler (err,req,res,next){
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({error:err})
}

//Port

app.listen(5000,()=>{
    console.log('server is running port number 5000')
})