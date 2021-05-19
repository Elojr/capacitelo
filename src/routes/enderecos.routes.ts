import { Router } from 'express';
import { getRepository } from 'typeorm';
import Endereco from '../entities/Endereco';

const enderecosRouter = Router();

enderecosRouter.post('/', async (req, res) => {
  const enderecosRepository = getRepository(Endereco);

  const { rua, cep, cidade, estado, complemento } = req.body;

  const endereco = enderecosRepository.create({
    cep,
    cidade,
    estado,
    rua,
    complemento,
  });
  await enderecosRepository.save(endereco);

  return res.status(201).json(endereco);
});

enderecosRouter.get('/:id', async (req, res) => {
  const enderecosRepository = getRepository(Endereco);
  const endereco = await enderecosRepository.findOne(req.params.id);
  if (!endereco) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }
  return res.json(endereco);
});

enderecosRouter.put('/:id', async (req, res) => {
  const enderecosRepository = getRepository(Endereco);
  const endereco = await enderecosRepository.findOne(req.params.id);
  const { cep, cidade, estado, rua, complemento, empresa } = req.body;
  if (!endereco) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }
  enderecosRepository.merge(endereco, {
    cep,
    cidade,
    estado,
    rua,
    complemento,
    empresa,
  });
  await enderecosRepository.save(endereco);
  return res.json(endereco);
});

export default enderecosRouter;
