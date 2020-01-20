import { Router } from 'express';

import devController from './Controllers/DevController';
import searchController from './Controllers/SearchController';

const routes = Router();

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);

routes.get('/search', searchController.index);

module.exports = routes;
