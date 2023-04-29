import express from 'express';
import ShelveController from './shelve.controller';

const router = express.Router({ mergeParams: true });

router.get('/', ShelveController.readAll);
router.post('/', ShelveController.create);
router.get('/tree', ShelveController.readTree);
router.get('/path', ShelveController.getPathFromShelve);
router.get('/:shelveId', ShelveController.readByID);
router.patch('/:shelveId', ShelveController.update);
router.delete('/:shelveId', ShelveController.delete);

export default router;