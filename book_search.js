/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
	const result = {
		"SearchTerm": searchTerm,
		"Results": [],
	};

	// iterate through each book
	for (const book of scannedTextObj) {
		const ISBN = book["ISBN"];

		// sort content list based on their line numbers
		book["Content"].sort((a, b) => a.Line - b.Line);

		// iterate through content
		for (let i = 0; i < book["Content"].length; i++) {
			// if search word has a . in it, search first?
			// cleaning line
			let currLine = book["Content"][i]["Text"].replaceAll(",", "")
				.replaceAll("?", "")
				.replaceAll("!", "")
				.replaceAll(".", "")
				.replaceAll(";", "")
				.replaceAll("\"", "")
				.replaceAll("\\", "");
			// split line based on space (what happens if there's multiple spaces? trim?)
			currLine = currLine.split(" ");

			// if word exists in line, check if we've appended to the list already, do so if not
			if (currLine.includes(searchTerm)) {
				const found = {
					"ISBN": ISBN,
					"Page": book["Content"][i]["Page"],
					"Line": book["Content"][i]["Line"],
				};
				if (!result["Results"].includes(found)) {
					result["Results"].push(found);
				}
			}

			// check if there's hypens at the last word and if there's a next line
			if (currLine.at(-1).endsWith("-") && i < book["Content"].length - 1) {
				const lastElement = currLine.at(-1).replace("-", "");
				const nextElement = book["Content"][i + 1]["Text"].split(" ")[0];

				// if combining the hyphenated word results in searched word, add to result
				if (lastElement !== searchTerm
					&& searchTerm.includes(lastElement)
					&& (lastElement + nextElement) === searchTerm) {

					const currFound = {
						"ISBN": ISBN,
						"Page": book["Content"][i]["Page"],
						"Line": book["Content"][i]["Line"],
					};
					const nextFound = {
						"ISBN": ISBN,
						"Page": book["Content"][i + 1]["Page"],
						"Line": book["Content"][i + 1]["Line"],
					};
					if (!result["Results"].includes(currFound)) {
						result["Results"].push(currFound);
					}
					if (!result["Results"].includes(nextFound)) {
						result["Results"].push(nextFound);
					}
				}
			}
			// if so, check if the hypenated string is a substring of the wanted word and also not === to the word (can use includes)
			// if so, grab the first word of the next line, split or see if you can grab until there's a space,
			// combine the hypenated pieces and check if they match the search word
			// if so, append both lines onto ans
			// for each line, check if it has not been appended yet (or use a set?)
		}
	}
	console.log(result);
	return result;
}

/** Example input object. */
const twentyLeaguesIn = [
	{
		"Title": "Twenty Thousand Leagues Under the Sea",
		"ISBN": "9780000528531",
		"Content": [
			{
				"Page": 31,
				"Line": 8,
				"Text": "now simply went on by her own momentum.  The dark-",
			},
			{
				"Page": 31,
				"Line": 9,
				"Text": "ness was then profound; and however good the Canadian\'s",
			},
			{
				"Page": 31,
				"Line": 10,
				"Text": "eyes were, I asked myself how he had managed to see, and",
			},
		],
	},
];

/** Example output object */
const twentyLeaguesOut = {
	"SearchTerm": "the",
	"Results": [
		{
			"ISBN": "9780000528531",
			"Page": 31,
			"Line": 9,
		},
	],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___|
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/

 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
	console.log("PASS: Test 1");
}
else {
	console.log("FAIL: Test 1");
	console.log("Expected:", twentyLeaguesOut);
	console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
	console.log("PASS: Test 2");
}
else {
	console.log("FAIL: Test 2");
	console.log("Expected:", twentyLeaguesOut.Results.length);
	console.log("Received:", test2result.Results.length);
}