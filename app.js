const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 8001

mongoose.connect('mongodb://localhost:27017/medicamentos', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err)
});

const Medicamento = mongoose.model('Medicamento', { name: String, farmaco: String, dosagem: String });

const medication = new Medicamento ({ name: "teste1", farmaco: "teste2", dosagem: "teste3" });
medication.save().then(() => console.log('medicamento adicionado'));

//diz ao app pra usar ody parser
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

app.get("/api/medicamentos", (req,res) => {
    Medicamento.find({}).then((medicamentos) => {
        res.json(medicamentos)
    })    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/api/medicamentos/:id", (req,res) => {
    res.json([{
    "nome": "dwqdqgfgdw",
    "farmaco": "wqdgfgwqdwq",
    "dosagem": "dwqdgfgfgqd"
    }])
})

app.post("/api/medicamentos", (req,res) => {
    console.log(req.body)
    res.status(503).json([{"error":"não implementado!"}])
})

app.put("/api/medicamentos", (req,res) => {
    //console.log(req.body)
    res.status(503).json([{"error":"não implementado!"}])
})

app.delete("/api/medicamentos", (req,res) => {
    //console.log(req)
    res.json([{"error":"não implementado!"}])
})
