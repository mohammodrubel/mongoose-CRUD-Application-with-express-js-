const { application } = require('express')
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const todoSchemas = require('../Schemas/todoSchemas')
const Todo = new mongoose.model("Todo",todoSchemas)
// get all todos 
router.get("/",async(req,res)=>{
     Todo.find({},(err,data)=>{
        if(err){
            res.status(500).json({
                error:'Thare was a server side error'
            })
        }else{
            res.status(200).json({
                result:data,
                message:'total  Todo heare'
            })
        }
    })
})


//get a todos
router.get("/:id",async(req,res)=>{
    //  const mongoose = mongoose.Types.objectId(req.params.id)
     Todo.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).json({
                error:'Thare was a server side error'
            })
        }else{
            res.status(200).json({
                result:data,
                message:'_id matched'
            })
        }
    })
})


// post a todos 
router.post("/",async (req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error:'Thare was a server side error'
            })
        }else{
            res.status(200).json({
                message:'Todo was successfully inserted'
            })
        }
    })
})

//post many 
router.post("/all",async (req,res)=>{
    // const mongoose = mongoose.Types.objectId(req.params.id)
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:'Thare was a server side error'
            })
        }else{
            res.status(200).json({
                message:'Todo ware successfully inserted'
            })
        }
    })
})

// put or update method 
router.put("/:id",async(req,res)=>{
    
     Todo.updateOne({_id:req.params.id},{
        $set:{
            status:'active',
            description:'Distrub'
        }
    },(err)=>{
        if(err){
            res.status(500).json({
                error:'Thare was a server side error'
            })
        }else{
            res.status(200).json({
                message:'Todo ware successfully updated'
            })
        }
    })
})

// delete method 
router.delete("/:id",async(req,res)=>{
    Todo.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.status(500).json({
                error:'Thare was a server side error'
            })
        }else{
            res.status(200).json({
                message:'Todo ware delete successfully '
            })
        }
    })
})

module.exports = router