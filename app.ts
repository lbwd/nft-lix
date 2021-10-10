import express from "express";
import { main } from "./src/functions";
import { Title } from "./src/types";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("App listening on port " + port);
});

app.get("/", (req, res) => {
	console.log("GET /");
	let results: Title[] = main();
	let retVal: String = "";

	results.forEach((title) => {
		retVal +=
			"<b>" + title.value + "</b><br />" + title.directedBy + "<br /><br />";
	});

	res.status(200).send(retVal);
});
