import { Request, Response } from "express";
import { Shelve } from "./shelve.model";
import { Book } from "../book/book.model";

const buildTree = (parent: Shelve, shelves: Shelve[], path?: string): any => {
    path = path ? `${path} / ${parent.name}` : parent.name;
    const children = shelves.filter((shelve) => shelve.parentShelveId === parent.shelveId);
    return {
        ...parent,
        path,
        children: children.map(child => buildTree(child, shelves, path)),
    };
}

class ShelveController {
    async readAll(req: Request, res: Response) {
        try {
            const { parentShelveId } = req.query;
            const shelves: any = await Shelve.findAll({
                where: { parentShelveId: parentShelveId ?? null },
                raw: true,
            });
            if (parentShelveId) {
                const parentShelve = await Shelve.findOne({ where: { shelveId: parentShelveId }, raw: true });
                if (parentShelve) {
                    return res.json([{ shelveId: parentShelve.parentShelveId, name: "...", readOnly: true }, ...shelves]);
                }
            }
            return res.json(shelves);
        } catch (error: any) {
            return res.status(500).json({ error });
        }
    }

    async readByID(req: Request, res: Response) {
        try {
            const { shelveId } = req.params;
            const shelve = await Shelve.findOne({ where: { shelveId } });
            return res.json(shelve);
        } catch (error: any) {
            return res.json({ status: 500, error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = await Shelve.create(req.body);

            return res.status(200).json({ data });
        } catch (error: any) {
            return res.json({ status: 500, error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { shelveId } = req.params;
            const { name, parentShelveId } = req.body;

            await Shelve.update({ name, parentShelveId }, { where: { shelveId } });

            return res.status(200).json();
        } catch (error: any) {
            return res.json({ status: 500, error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { shelveId } = req.params;

            const shelveChild = await Shelve.count({ where: { parentShelveId: shelveId } });
            const shelveBooks = await Book.count({ where: { shelveId } });
            if (shelveChild + shelveBooks > 0)
                return res.status(200).json({ success: false, message: "Location is not empty." });

            await Shelve.destroy({ where: { shelveId } });
            return res.status(200).json({ success: true });
        } catch (error: any) {
            return res.json({ status: 500, error });
        }
    }

    async readTree(req: Request, res: Response) {
        const { parentShelveId } = req.query;

        const shelves = await Shelve.findAll({ raw: true });

        const data = shelves.filter(shelve =>
            (!parentShelveId && shelve.parentShelveId == null)
            || shelve.parentShelveId == parseInt(parentShelveId as string))
            .map((shelve) => buildTree(shelve, shelves));

        return res.json(data);
    }

    async getPathFromShelve(req: Request, res: Response) {
        const { shelveId } = req.query;

        if (!shelveId) return res.status(400).json({ message: "Missing shelveId" });

        const shelves = await Shelve.findAll({ raw: true });
        const shelve = shelves.find(shelve => shelve.shelveId === parseInt(shelveId.toString()));

        if (!shelve) return res.status(400).json({ message: "Missing shelveId" });

        const successors: Shelve[] = [];

        function traverse(current: Shelve) {
            successors.unshift(current);

            const parents = shelves.filter((shelve) => shelve.shelveId === current.parentShelveId);
            for (const parent of parents) {
                traverse(parent);
            }
        }

        traverse(shelve);

        return res.json(successors);
    }
}

export default new ShelveController();