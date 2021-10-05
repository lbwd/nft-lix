import { main } from "./functions";
import { Title } from "./types";

// Main
let results: Title[] = main();

results.forEach((title) => {
	console.log(title.value);
});
