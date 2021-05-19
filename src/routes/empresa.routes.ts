import { Router } from 'express';
import { getRepository } from 'typeorm';
import Empresa from '../entities/Empresa';

const empresaRouter = Router();

empresaRouter.get('/', async (req, res) => {
  const empresaRepository = getRepository(Empresa);
  const empresa = await empresaRepository.find({ relations: ['endereco'] });

  return res.json(empresa);
});

empresaRouter.get('/:id', async (req, res) => {
  const empresaRepository = getRepository(Empresa);
  const empresa = await empresaRepository.findOne(req.params.id, {
    relations: ['endereco'],
  });

  return res.json(empresa);
});

empresaRouter.post('/', async (req, res) => {
  const empresaRepository = getRepository(Empresa);
  const { nome, cnpj, endereco } = req.body;

  const empresa = empresaRepository.create({
    nome,
    cnpj,
    endereco,
  });
  await empresaRepository.save(empresa);
  return res.status(201).json(empresa);
});

empresaRouter.put('/:id', async (req, res) => {
  const empresaRepository = getRepository(Empresa);
  const empresa = await empresaRepository.findOne(req.params.id);
  const { nome, cnpj, endereco } = req.body;

  if (!empresa) {
    return res.status(404).send({ message: 'Falha ao atualizar empresa!' });
  }

  empresaRepository.merge(empresa, { nome, cnpj, endereco });
  await empresaRepository.save(empresa);
  return res.json(empresa);
});

empresaRouter.delete('/:id', async (req, res) => {
  const empresaRepository = getRepository(Empresa);
  const empresa = await empresaRepository.findOne(req.params.id);
  if (!empresa) {
    return res.status(404).json({ error: 'Empresa não encontrada' });
  }

  await empresaRepository.remove([empresa]);
  return res.status(204).json();
});

export default empresaRouter;
