const e = require("express");
const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo',{useNewUrlParser:true});
mongoose.connection
   .once('open',()=>{
     console.log('DB Connected');
   })
   .on('error',()=>{
     console.log('err', err);
   })
const fs = require("fs");
app.use(express.json());

let bro = [];
fs.readFile("./bro.json", (err, data) => {
  bro = JSON.parse(data.toString());
});

app.get("/list", (req, res) => {
  res.status(200);
  res.json(bro);
});
app.post("/add", (req, res) => {
  const { id, name, isFav, isDel } = req.body;
  bro.push({ id: bro.length, name: name, isFav: isFav, isDel: isDel });
  fs.writeFile("./bro.json", JSON.stringify(bro), (err, data) => {});
  res.json(bro);
  bro;
});
app.put("/update/:id", (req, res) => {
  const bro1 = bro.map((e) => {
    if (e.id == req.params.id) {
      return {
        id: e.id,
        name: req.body.name,
        isFav: req.body.isFav,
        isDel: req.body.isDel,
      };
    } else return e;
  });
  fs.writeFile("./bro.json", JSON.stringify(bro1), (err, data) => {
    res.json(bro);
    bro;
  });
});

app.delete('/delete/:id',(req,res)=>{
  let dd = bro.map((ele)=>{
    if(ele.id == req.params.id){
    console.log(ele);
    return{
      id: ele.id,
      name:ele.name,
      isFav:ele.isFav,
      isDel: "true"
    }} else return ele
  }) 
  fs.writeFile("./bro.json", JSON.stringify(dd), (err, data) => {
    res.json(bro);
    
  });
})

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
