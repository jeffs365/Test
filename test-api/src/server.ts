import db from "./config/database.config";
import app from "./app";

const port = 9000;

db.sync().then(() => {
	console.log("DB is connected");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});