import express from 'express';
import { UserRouters } from '../modules/user/user.route';
import { CowRouters } from '../modules/cow/cow.route';
import { OrderRouters } from '../modules/order/order.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRouters,
  },

  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/cows',
    route: CowRouters,
  },
  {
    path: '/orders',
    route: OrderRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const ApplicationRouters = router;
