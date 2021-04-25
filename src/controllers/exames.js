var Exames = require("../models/exames");
var Laboratorios = require("../models/laboratorios");
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

exports.test = (req, res) => {
  res.json("Teste de retorno");
};

//Adicionar ao BD
exports.create = async (req, res) => {
  const lab = await Exames.create({
    nome: req.body.nome,
    tipo: req.body.tipo,
  });
  return res.json(lab);
};

exports.findAll = async (req, res) => {
  await Exames.find((error, lab) => {
    if (error) console.error(error);
    res.json(lab);
  });
};

exports.findbyName = async (req, res) => {
    const exame = await Exames.findOne({nome: req.params.nome}).lean()
    const laboratorios = await Laboratorios.find({exames: ObjectId(exame._id)})
    return res.json(laboratorios)
  }; 
 

exports.update = async (req, res) => {
  await Exames.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        nome: req.body.nome,
        tipo: req.body.tipo
      },
    },
    { new: true },
    (error, lab) => {
      if (error) console.error(error);
      res.json(lab);
    }
  );
};

exports.delete = async (req, res) => {
    await Exames.findOneAndUpdate(
        req.params.id,
        {
          $set: {
            status: 'inativo' 
          },
        },
        { new: true },
        (error, lab) => {
          if (error) console.error(error);
          res.json({ message: 'Exame Deletado' });
        }
      );
};
