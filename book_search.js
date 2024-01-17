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

		// iterate through content of a book
		for (let i = 0; i < book["Content"].length; i++) {
			// cleaning punctuation
			let currLine = book["Content"][i]["Text"].replaceAll(",", "")
				.replaceAll("?", "")
				.replaceAll("!", "")
				.replaceAll(";", "")
				.replaceAll("\"", "")
				.replaceAll("\\", "");

			// if searchTerm doesn't have a period, replace them (ex: Mr.)
			if (!searchTerm.includes(".")) {
				currLine.replaceAll(".", "");
			}

			// split line based on space and remove empty words created by double spaces
			currLine = currLine.split(" ").filter(item => item);

			// if word exists in line, append line info to results if not there already
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

			// check if there's a hypen at the last word and if there's a next line
			if (currLine.at(-1).endsWith("-") && i < book["Content"].length - 1) {
				const lastElement = currLine.at(-1).replace("-", "");
				const nextElement = book["Content"][i + 1]["Text"].split(" ")[0];

				// if combining the hyphenated word and next word results in searched word, add both lines to result
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
		}
	}
	console.log(result);
	return result;
}

/** Test Input objects */
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

const TwoBooksIn = [
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
	{
		"Title": "Middlegame",
		"ISBN": "9781250195524",
		"Content": [
			{
				"Page": 35,
				"Line": 28,
				"Text": "\"Mr. Roger, I'd give myself a chainsaw hand for you,\" he says, and she laughs, and",
			},
			{
				"Page": 35,
				"Line": 29,
				"Text": "everything is wonderful; everything is perfect. ",
			},
			{
				"Page": 35,
				"Line": 30,
				"Text": "There are pieces missing, sure, and not just in the living room floor, ",
			},
			{
				"Page": 35,
				"Line": 31,
				"Text": "but whose life doesn't have a few missing pieces?",
			},
		],
	},
];

const emptyIn = [];

const emptyBookIn = [
	{
		"Title": "Twenty Thousand Leagues Under the Sea",
		"ISBN": "9780000528531",
		"Content": [],
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

const twentyLeaguesDarkOut = {
	"SearchTerm": "darkness",
	"Results": [
		{
			"ISBN": "9780000528531",
			"Page": 31,
			"Line": 8,
		},
		{
			"ISBN": "9780000528531",
			"Page": 31,
			"Line": 9,
		},
	],
};

// checking if hyphenated words are accounted for
const test3result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesDarkOut) === JSON.stringify(test3result)) {
	console.log("PASS: Test 3");
}
else {
	console.log("FAIL: Test 3");
	console.log("Expected:", twentyLeaguesDarkOut);
	console.log("Received:", test3result);
}

const TwoBooksOut = {
	"SearchTerm": "and",
	"Results": [
		{
			"ISBN": "9780000528531",
			"Page": 31,
			"Line": 9,
		},
		{
			"ISBN": "9780000528531",
			"Page": 31,
			"Line": 10,
		},
		{
			"ISBN": "9781250195524",
			"Page": 35,
			"Line": 28,
		},
		{
			"ISBN": "9781250195524",
			"Page": 35,
			"Line": 30,
		},
	],
};

// checking search through multiple books
const test4result = findSearchTermInBooks("and", TwoBooksIn);
if (JSON.stringify(TwoBooksOut) === JSON.stringify(test4result)) {
	console.log("PASS: Test 4");
}
else {
	console.log("FAIL: Test 4");
	console.log("Expected:", TwoBooksOut);
	console.log("Received:", test4result);
}

const caseOut = {
	"SearchTerm": "The",
	"Results": [
		{
			"ISBN": "9780000528531",
			"Page": 31,
			"Line": 8,
		},
	],
};

// checking if case sensitive
const test5result = findSearchTermInBooks("The", TwoBooksIn);
if (JSON.stringify(caseOut) === JSON.stringify(test5result)) {
	console.log("PASS: Test 5");
}
else {
	console.log("FAIL: Test 5");
	console.log("Expected:", caseOut);
	console.log("Received:", test5result);
}

const emptyStringOut = {
	"SearchTerm": "",
	"Results": [],
};

// check if nothing returns given empty string
const test6result = findSearchTermInBooks("", TwoBooksIn);
if (JSON.stringify(emptyStringOut) === JSON.stringify(test6result)) {
	console.log("PASS: Test 6");
}
else {
	console.log("FAIL: Test 6");
	console.log("Expected:", emptyStringOut);
	console.log("Received:", test6result);
}

const emptyOut = {
	"SearchTerm": "The",
	"Results": [],
};

// check if empty given empty input
const test7result = findSearchTermInBooks("The", emptyIn);
if (JSON.stringify(emptyOut) === JSON.stringify(test7result)) {
	console.log("PASS: Test 7");
}
else {
	console.log("FAIL: Test 7");
	console.log("Expected:", emptyOut);
	console.log("Received:", test7result);
}

// check if empty given empty book
const test8result = findSearchTermInBooks("The", emptyBookIn);
if (JSON.stringify(emptyOut) === JSON.stringify(test8result)) {
	console.log("PASS: Test 8");
}
else {
	console.log("FAIL: Test 8");
	console.log("Expected:", emptyOut);
	console.log("Received:", test8result);
}

const noResultOut = {
	"SearchTerm": "bacaw",
	"Results": [],
};

// check if empty given word not in text
const test9result = findSearchTermInBooks("bacaw", TwoBooksIn);
if (JSON.stringify(noResultOut) === JSON.stringify(test9result)) {
	console.log("PASS: Test 9");
}
else {
	console.log("FAIL: Test 9");
	console.log("Expected:", noResultOut);
	console.log("Received:", test9result);
}

const noHyphenOut = {
	"SearchTerm": "dark",
	"Results": [],
};

// check if no result should be found, even if within hyphenated word
const test10result = findSearchTermInBooks("dark", TwoBooksIn);
if (JSON.stringify(noHyphenOut) === JSON.stringify(test10result)) {
	console.log("PASS: Test 10");
}
else {
	console.log("FAIL: Test 10");
	console.log("Expected:", noHyphenOut);
	console.log("Received:", test10result);
}

const punctOut = {
	"SearchTerm": "pieces",
	"Results": [
		{
			"ISBN": "9781250195524",
			"Page": 35,
			"Line": 30,
		},
		{
			"ISBN": "9781250195524",
			"Page": 35,
			"Line": 31,
		},
	],
};

// check if word with punct (here is ?) is found
const test11result = findSearchTermInBooks("pieces", TwoBooksIn);
if (JSON.stringify(punctOut) === JSON.stringify(test11result)) {
	console.log("PASS: Test 11");
}
else {
	console.log("FAIL: Test 11");
	console.log("Expected:", punctOut);
	console.log("Received:", test11result);
}

const periodOut = {
	"SearchTerm": "Mr.",
	"Results": [
		{
			"ISBN": "9781250195524",
			"Page": 35,
			"Line": 28,
		},
	],
};

// check if words with . result is found
const test12result = findSearchTermInBooks("Mr.", TwoBooksIn);
if (JSON.stringify(periodOut) === JSON.stringify(test12result)) {
	console.log("PASS: Test 12");
}
else {
	console.log("FAIL: Test 12");
	console.log("Expected:", periodOut);
	console.log("Received:", test12result);
}

const dialogueOut = {
	"SearchTerm": "you",
	"Results": [
		{
			"ISBN": "9781250195524",
			"Page": 35,
			"Line": 28,
		},
	],
};

// check if words in dialogue are found
const test13result = findSearchTermInBooks("you", TwoBooksIn);
if (JSON.stringify(dialogueOut) === JSON.stringify(test13result)) {
	console.log("PASS: Test 13");
}
else {
	console.log("FAIL: Test 13");
	console.log("Expected:", dialogueOut);
	console.log("Received:", test13result);
}