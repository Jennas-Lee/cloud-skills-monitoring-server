import { Router } from 'express';

import passport from 'passport';

import accountGet from '../middlewares/auth/account';
import refresh from '../middlewares/auth/refresh';
import signIn from '../middlewares/auth/signIn';
import signUp from '../middlewares/auth/signUp';

const router: Router = Router();

// router.get('/account', passport.authenticate('jwt', { session: false }), accountGet);
router.post('/refresh', refresh);
router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;