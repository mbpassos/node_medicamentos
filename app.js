const express = require('express');
const Medicamento = require("./model/medicamento.js")
const mongoose = require('mongoose');
const app = express()
const port = 8001

mongoose.connect('mongodb://localhost:27017/medicamentos', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err)
});

//diz ao app para ler json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/medicamentos", (req,res) => {
    Medicamento.find({}).then((medicamentos) => {
        res.json(medicamentos)
    }).catch(() => res.status(400).json({error: "ocorreu um erro "}))    
})

app.get("/api/medicamentos/:id", (req,res) => {
    console.log(req.params)
    Medicamento.findById(req.params.id).then((medicamento) => {
        res.json(medicamento ? medicamento : {})
    }).catch((e) => res.status(400).json({error: "não foi possível obter medicamento"}))  
})

app.post("/api/medicamentos", (req,res) => {
    const medication = new Medicamento ({ name: req.body.nome, farmaco: req.body.farmaco , dosagem: req.body.dosagem });
    medication.save().then(() => {
        console.log('medicamento adicionado')
        res.status(201).send()
    }).catch((e) => res.status(400).json({error: "ocorreu um erro ao gravar"}))   
})

app.put("/api/medicamentos/:_id", (req,res) => {
    Medicamento.updateOne(req.params, req.body).then((result) => {
        const updated = result.nModified == 1 
        res.json(updated)
    })
})

app.delete("/api/medicamentos/:_id", (req,res) => {
    Medicamento.deleteOne(req.params).then((result) => {
        res.json({deleted : result.deletedCount > 0})
    }).catch((e) => res.status(400).json({error: "ocorreu um erro ao apagar"}))    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
