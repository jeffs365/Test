import express from "express";
import bookRouter from "./book/book.route";
import shelveRouter from "./shelve/shelve.route";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/api/v1/shelves", shelveRouter);
app.use("/api/v1/shelves/:shelveId/books", bookRouter);

export default app;