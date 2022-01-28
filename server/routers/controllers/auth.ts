import { Router } from 'express';

import refresh from '../middlewares/auth/refresh';
import signIn from '../middlewares/auth/signIn';
import signUp from '../middlewares/auth/signUp';

const router: Router = Router();

router.post('/refresh', refresh);
router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;