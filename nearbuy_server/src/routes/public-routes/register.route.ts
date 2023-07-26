import { Router } from 'express';
import { controllers } from '../../controllers';

const router = Router();

router.post('/register', controllers.register);

export default router;