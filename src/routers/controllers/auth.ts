/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth API
 */

import { Router } from 'express';

import passport from 'passport';

import accountGet from '../middlewares/auth/account';
import refresh from '../middlewares/auth/refresh';
import signIn from '../middlewares/auth/signIn';
import signUp from '../middlewares/auth/signUp';

const router: Router = Router();

// router.get('/account', passport.authenticate('jwt', { session: false }), accountGet);

/**
 * @swagger
 * path:
 *  /auth/refresh:
 *    post:
 *      summary: Refresh tokens
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: Refresh tokens successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('/refresh', refresh);
router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;