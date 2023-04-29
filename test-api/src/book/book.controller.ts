import { Request, Response } from "express";
import { Book } from "./book.model";


class BookController {
    async readAll(req: Request, res: Response) {
        try {
            const { shelveId } = req.params;
            const books = await Book.findAll({ where: { shelveId } });
            return res.json(books.map(book => ({ ...book.toJSON(), isBook: true })));
        } catch (error: any) {
            return res.status(500).json({ error });
        }
    }

    async readByID(req: Request, res: Response) {
        try {
            const { bookId } = req.params;
            const book = await Book.findOne({ where: { bookId } });
            return res.json(book);
        } catch (error: any) {
            return res.status(500).json({ error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { shelveId } = req.params;
            const data = await Book.create({
                ...req.body,
                shelveId: shelveId,
            });
            return res.status(200).json({ data });
        } catch (error: any) {
            return res.status(500).json({ error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { bookId } = req.params;
            const { title, shelveId } = req.body;

            await Book.update({ title, shelveId }, { where: { bookId } });

            return res.status(200).json();
        } catch (error: any) {
            return res.status(500).json({ error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { bookId } = req.params;
            await Book.destroy({ where: { bookId } });
            return res.status(200).json({ success: true });
        } catch (error: any) {
            return res.status(500).json({ error });
        }
    }
}

export default new BookController();