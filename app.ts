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
		// Prizes
		if (title.prizes) {
			title.prizes.forEach((prize) => {
				retVal += prize + "<br />";
			});
		}

		retVal += "<b>" + title.value + "</b><br />" + title.directedBy + "<br />";

		// Cast
		if (title.cast) {
			retVal += "with";
			let first = true;
			title.cast.forEach((c) => {
				if (first) {
					first = false;
				} else {
					retVal += ",";
				}
				retVal += " " + c;
			});
			retVal += "<br />";
		}

		retVal += "<br />";
	});

	res.status(200).send(retVal);
});
