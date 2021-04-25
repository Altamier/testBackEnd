const mongoose = require("mongoose");

const laboratoriosSchema = new mongoose.Schema(
  {
    nome: { type: String },
    endereco: { type: String },
    status: { type: String, enum: ["ativo", "inativo"], default: "ativo" },
    exames: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Laboratorio", laboratoriosSchema);
