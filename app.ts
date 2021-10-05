import express from "express";
import { main } from "./functions";
import { Title } from "./types";

const app = express();
const port = 3000;

app.listen(port, () => {
	console.log("App listening on port " + port);
});

app.get("/", (req, res) => {
	console.log("GET /");
	let results: Title[] = main();
	let retVal: String = "";

	results.forEach((title) => {
		retVal += title.value + "<br />";
	});

	res.status(200).send(retVal);
});
