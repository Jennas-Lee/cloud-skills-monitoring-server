import { Router } from 'express';

import auth from './controllers/auth';
import healthcheck from './controllers/healthcheck';

const router: Router = Router();

router.use('/', healthcheck);
router.use('/auth', auth);

export default router;