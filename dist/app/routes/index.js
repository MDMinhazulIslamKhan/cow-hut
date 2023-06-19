'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ApplicationRouters = void 0;
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/user/user.route');
const userAuth_route_1 = require('../modules/user/userAuth.route');
const cow_route_1 = require('../modules/cow/cow.route');
const order_route_1 = require('../modules/order/order.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: userAuth_route_1.UserAuthRouters,
  },
  {
    path: '/users',
    route: user_route_1.UserRouters,
  },
  {
    path: '/cows',
    route: cow_route_1.CowRouters,
  },
  {
    path: '/orders',
    route: order_route_1.OrderRouters,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.ApplicationRouters = router;
