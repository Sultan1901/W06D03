const express = require('express')
const app = express()
const PORT = 5000
const fs = require('fs')
app.use(express.json())


let bro = []
fs.readFile('./bro.json',(err , data)=>{
    bro = JSON.parse(data.toString())
})

app.get('/list', (req , res)=>{
    res.status(200);
    res.json(bro)
})
app.post('/add' , (req , res)=>{
    const {id , name ,isFav , isDel} = req.body
    bro.push({id:bro.length , name:name ,isFav:isFav, isDel:isDel  })
    fs.writeFile('./bro.json', JSON.stringify(bro),(err,data)=>{})
    res.json(bro);bro
})

app.listen(PORT , ()=>{
    console.log(`server on ${PORT}`);
})