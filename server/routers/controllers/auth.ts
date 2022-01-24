import { Router } from 'express';

import signUp from '../middlewares/auth/signUp';

const router: Router = Router();

router.post('/signup', signUp);

export default router;