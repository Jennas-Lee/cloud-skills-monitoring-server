import { Router } from 'express';

import healthCheck from '../middlewares/healthcheck/healthcheck';

const router: Router = Router();

router.get('/health', healthCheck);

export default router;