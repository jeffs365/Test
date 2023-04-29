import express from 'express';
import BookController from './book.controller';

const router = express.Router({ mergeParams: true });

router.get('/', BookController.readAll);
router.get('/:bookId', BookController.readByID);
router.post('/', BookController.create);
router.patch('/:bookId', BookController.update);
router.delete('/:bookId', BookController.delete);

export default router;