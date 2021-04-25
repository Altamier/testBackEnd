var Laboratorio = require("../models/laboratorios");
var Exame = require("../models/exames");
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

exports.test = (req, res) => {
  res.json("Teste de retorno");
};

//Adicionar ao BD
exports.create = async (req, res) => {
  const lab = await Laboratorio.create({
    nome: req.body.nome,
    endereco: req.body.endereco,
  });
  return res.json(lab);
};

exports.findAll = async (req, res) => {
  await Laboratorio.find((error, lab) => {
    if (error) console.error(error);
    res.json(lab);
  });
};

exports.update = async (req, res) => {
  await Laboratorio.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        nome: req.body.nome,
        endereco: req.body.endereco,
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
  await Laboratorio.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        status: "inativo",
      },
    },
    { new: true },
    (error, lab) => {
      if (error) console.error(error);
      res.json({ message: "Laboratorio Deletado" });
    }
  );
};

exports.addExame = async (req, res) => {
  Exame.findOne({ _id: ObjectId(req.body.exameId), status: "ativo" }).then(
    (result) => {
      if (!result) return res.status(404).send("Exame Não Encontrado");
      Laboratorio.findOneAndUpdate(
        { _id: req.params.id, status: "ativo" },
        {
          $push: {
            exames: req.body.exameId,
          },
        },
        { new: true },
        (error, lab) => {
          if (error) console.error(error);
          if (!lab) return res.status(404).send("Laboratorio Não Encontrado");
          res.json(lab);
        }
      );
    }
  );
};

exports.removeExame = async (req, res) => {
  const result = await Exame.find({
    _id: ObjectId(req.body.exameId),
    status: "ativo",
  });
  if (!result) return res.status(404).send("Exame Não Encontrado");

  const lab = await Laboratorio.findOneAndUpdate(
    { _id: req.params.id, status: "ativo" },
    { $pull: { exames: req.body.exameId } }
  );
  if(!lab) return res.status(404).send("Laboratorio Não Encontrado");
  return res.json(lab);
};
