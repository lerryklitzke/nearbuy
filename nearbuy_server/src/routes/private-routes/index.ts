import { Router } from 'express';

import isAuthorized from './isAuthorized.route';

const router = Router();

router.use(isAuthorized);

export default router;