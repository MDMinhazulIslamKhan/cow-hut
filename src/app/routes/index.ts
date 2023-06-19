import express from 'express';
import { UserRouters } from '../modules/user/user.route';
import { UserAuthRouters } from '../modules/user/userAuth.route';
import { CowRouters } from '../modules/cow/cow.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserAuthRouters,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/cows',
    route: CowRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const ApplicationRouters = router;