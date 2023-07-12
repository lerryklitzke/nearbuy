import { Router } from 'express';

import register from './register.route';
import login from './login.route';

const router = Router();

router.use(register);
router.use(login);

export default router;
