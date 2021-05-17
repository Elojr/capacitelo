import { Router } from 'express';
import enderecos from './enderecos.routes';

const router = Router();

router.use('/enderecos', enderecos);

export default router;
