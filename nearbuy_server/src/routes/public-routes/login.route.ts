import { Router } from 'express';
import { authentication } from '../../controllers/authentication.controller';

const router = Router();

router.post('/login', authentication);

export default router;