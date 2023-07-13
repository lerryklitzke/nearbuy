import { Router } from 'express';
import { isAuthorized } from '../../middlewares/authorization';

const router = Router();

router.use('/is-authorized', isAuthorized);

export default router;