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

export default enderecosRouter;
