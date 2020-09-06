import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grande = db.gradesModel;

const create = async (req, res) => {

  const grade = new Grande({
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value,
    lastModified: req.body.lastModified,
  });

  try {
    const data = await grade.save();
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await Grades.find(condition);

    if (!data) {
      res.status(404).send('Nao encontrado nenhuma nota');
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findById({ _id: id });

    if (!data) {
      res.status(404).send('Nao encontrado nenhuma nota');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Documento id: ' + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send('Nao encontrado nenhuma Nota para atualizar');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Nota id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndRemove({ _id: id });

    if (!data) {
      res.status(404).send('Nao encontrado nenhuma nota para excluir');
    } else {
      res.send('Nota excluido com sucesso');
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Nota id: ' + id });
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Grades.deleteMany();

    if (!data) {
      res.status(404).send('Nao encontrado nenhum nota para excluir');
    } else {
      res.send('Gradess excluidos com sucesso');
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos os Gradess' });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };