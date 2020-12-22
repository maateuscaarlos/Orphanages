import {Router} from 'express';
import multer from 'multer';
import OrphanagesController from '../controller/OrphanagesController'
import uploadConfig from '../config/upload'

const routes = Router();
const uploadMulter =multer(uploadConfig);

routes.get('/orphanages',OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages',uploadMulter.array('images'), OrphanagesController.create);

export default routes;
