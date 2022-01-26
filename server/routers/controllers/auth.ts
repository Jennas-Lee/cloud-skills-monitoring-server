import { Router } from 'express';

import signIn from '../middlewares/auth/signIn';
import signUp from '../middlewares/auth/signUp';

const router: Router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;