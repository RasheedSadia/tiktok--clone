import express from 'express'
import mongoose from 'mongoose'
const express = require ("express");
const mongoose = require ("mongoose")
import data from './data.js'
import Videos from './dbModel.js'

//app config
 const app= express();
 const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeaders('Access-Control-Allow-origin', '*'),
    res.setHeaders('Access-Control-Allow-Headers', '*'),
    next()
})

// DB config
const connection_url ='mongodb+srv://<admin1>:<h1DQXfJQRJAqAl6X>@cluster0.c5pcyor.mongodb.net/tiktok?retryWrites=true&w=majority'

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    usecreateIndex:true,
    useUnifiedTopology:true
})
//endpoints
 app.get('/',(req,res)=>res.status(200).send('hello world'));

 app.get('/v1/posts', (req,res)=>res.status(200).send(data));

 app.get("/v2/posts", (req, res) => {
  Videos.find((err,data)=>{
    if(err){
        res.status(500).send(err)
    } else{
        res.status(200).send(data)
    }
  })
 })

 app.post('/v2posts',(req,res)=>{
    const dbVideos = req.body
    VideoSidebar.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
 })

//listen
 app.listen(port,()=>console.log(`listening on localhost: ${port}`))

