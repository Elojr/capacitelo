import { Router } from 'express';
import { getRepository } from 'typeorm';
import Cliente from '../entities/Cliente';
import Empresa from '../entities/Empresa';
import Endereco from '../entities/Endereco';

const clientesRouter = Router();

// CADASTRAR CLIENTE
clientesRouter.post('/', async (req, res) => {
  const clienteRepository = getRepository(Cliente);
  const empresaRepository = getRepository(Empresa);
  const enderecoRepository = getRepository(Endereco);

  const { nome, cpf, telefone, empresa, enderecos } = req.body;

  const cliente = clienteRepository.create({
    nome,
    cpf,
    telefone,
    empresa,
    enderecos,
  });

  await clienteRepository.save(cliente);

  return res.status(201).json(cliente);
});

// ENCONTRAR TODOS OS CLIENTES
clientesRouter.get('/', async (req, res) => {
  const clientesRepository = getRepository(Cliente);

  const clientes = await clientesRepository.find({
    relations: ['empresa', 'enderecos'],
  });

  return res.json(clientes);
});

// ENCONTRAR CLIENTE POR ID
clientesRouter.get('/:id', async (req, res) => {
  const clientesRepository = getRepository(Cliente);

  const cliente = await clientesRepository.findOne(req.params.id, {
    relations: ['empresa', 'enderecos'],
  });

  if (!cliente) {
    return res.status(404).send({ message: 'Id de cliente não encontrado' });
  }

  return res.json(cliente);
});

clientesRouter.delete('/:id', async (req, res) => {
  const clientesRepository = getRepository(Cliente);

  const cliente = await clientesRepository.findOne(req.params.id);

  if (!cliente) {
    return res.status(404).send({ message: 'Cliente não encontrado!' });
  }

  await clientesRepository.remove([cliente]);

  return res.status(204).json();
});

clientesRouter.put('/:id', async (req, res) => {
  const clientesRepository = getRepository(Cliente);

  const cliente = await clientesRepository.findOne(req.params.id);

  if (!cliente) {
    return res.status(404).send({ message: 'Cliente não encontrado!' });
  }

  const { nome, cpf, telefone, empresa, enderecos } = req.body;

  await clientesRepository.merge(cliente, {
    nome,
    cpf,
    telefone,
    empresa,
    enderecos,
  });

  return res.status(204).json();
});

export default clientesRouter;
