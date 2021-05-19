import { Router } from 'express';
import { getRepository } from 'typeorm';
import Conta from '../entities/Conta';
import Cliente from '../entities/Cliente';

const contaRouter = Router();

contaRouter.post('/', async (req, res) => {
  const contaRepository = getRepository(Conta);
  const clienteRepository = getRepository(Cliente);

  const { agencia, numero, saldo, cliente } = req.body;

  const clienteTrue = await clienteRepository.findOne(cliente);

  if (!clienteTrue) {
    return res.status(404).json('Cliente não encontrado');
  }

  const conta = contaRepository.create({
    agencia,
    numero,
    saldo,
    cliente,
  });

  await contaRepository.save(conta);

  return res.json(conta);
});

contaRouter.get('/:id', async (req, res) => {
  const contaRepository = getRepository(Conta);

  const conta = await contaRepository.findOne(req.params.id);

  if (!conta) {
    return res.status(404).json('Conta não encontrada');
  }

  return res.json(conta);
});

contaRouter.put('/:id', async (req, res) => {
  const contaRepository = getRepository(Conta);

  const conta = await contaRepository.findOne(req.params.id);

  const { agencia, numero, saldo, cliente } = req.body;

  if (!conta) {
    return res.status(404).json('Conta não encontrada');
  }

  contaRepository.merge(conta, { agencia, numero, saldo, cliente });
  await contaRepository.save(conta);

  return res.json(conta);
});

contaRouter.delete('/:id', async (req, res) => {
  const contaRepository = getRepository(Conta);

  await contaRepository.delete(req.params.id);

  return res.json('Deletado com sucesso');
});

contaRouter.get('/', async (req, res) => {
  const contaRepository = getRepository(Conta);

  const contas = await contaRepository.find();

  return res.json(contas);
});

export default contaRouter;
