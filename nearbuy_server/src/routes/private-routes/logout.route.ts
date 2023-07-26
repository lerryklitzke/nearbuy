import { Router } from 'express';
import controllers from '../../controllers';

const router = Router();

router.post('/logout', controllers.logout);

export default router;