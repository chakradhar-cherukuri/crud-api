const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.models');

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.listen(3000,()=>{
    console.log('server is running')
})

app.get('/',(req,res) => {

    res.send('hello from node Api...todn')

});

app.get('/api/products',async(req,res)=>{
    try{
        const product=await Product.find({});
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
});

app.get('/api/products/:id',async(req,res)=>{
    try{

        const{id} =req.params;

        const product=await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
});

app.post('/api/products',async(req,res)=>{
    try{
        const product=await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
});

//update

app.put('/api/products/:id',async(req,res)=>{
    try{

        const{id} =req.params;

        const product=await Product.findByIdAndUpdate(id,req.body);
        const updatedproduct=await Product.findById(id);

        res.status(200).json(updatedproduct);
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
});

//delete

app.delete('/api/products/:id',async(req,res)=>{
    try{

        const{id} =req.params;

        const product=await Product.findByIdAndDelete(id);
        

        res.status(200).json({message:'deleted'});
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
});




mongoose.connect("mongodb+srv://iaminsane548:chakri123@nodeapi.d2tlqwl.mongodb.net/?retryWrites=true&w=majority&appName=nodeapi")
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("connection failed")
})

