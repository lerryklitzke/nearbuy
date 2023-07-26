import { Router } from 'express';
import { controllers } from '../../controllers';

const router = Router();

router.post('/login', controllers.login);

export default router;