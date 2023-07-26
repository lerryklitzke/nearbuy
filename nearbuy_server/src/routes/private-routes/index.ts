import { Router } from 'express';

import isAuthorized from './isAuthorized.route';
import logout from './logout.route';

const router = Router();

router.use(isAuthorized);
router.use(logout);

export default router;