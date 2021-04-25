const mongoose = require('mongoose')

const examesSchema = new mongoose.Schema({
  nome: { type: String },
  tipo: { type: String },
  status: { type: String, enum: ["ativo", "inativo"], default: 'ativo' }, 
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Exame', examesSchema);