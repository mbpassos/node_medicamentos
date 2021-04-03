const mongoose = require('mongoose');

const Medicamento = mongoose.model('Medicamento', 
{   name: String, 
    farmaco: String, 
    dosagem: String 
});

module.exports = Medicamento