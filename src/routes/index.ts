import { Router } from 'express';
import enderecos from './enderecos.routes';
import empresa from './empresa.routes';
import cliente from './cliente.routes';
import conta from './conta.routes';

const router = Router();

router.use('/enderecos', enderecos);
router.use('/empresa', empresa);
router.use('/cliente', cliente);
router.use('/conta', conta);

export default router;
