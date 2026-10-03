
# ALU Regex Data Extraction Program.

This program reads through a given raw text file and studies it pulling out and noting specific data types using Regex patterns, and then writes a JSON file with the filtered and matching data type according to the Regex Pattern used.

## Program Structure.

The program structure is like this:
​```
alu-regex-data-extraction_ikariuki-crypto/
├── input/
│   └── raw-text.txt
├── output/
│   └── sample-output.json
├── src/
│   └── main.js
└── README.md
​```
raw-text.txt contains the raw data which the program reads in. sample-output.json contains the compiled matched and filtered data types according to the Regex patterns. main.js contains the javascript that runs the program and README.md contains the program explanation.

## Running the program.

To run the program, Node.js is required with the command 'node src/main.js' from the project root and the output is written in output/sample-output.json

## Extracted data types.

The different data types that the program extracts are:
-Emails, the general pattern catches any email.

-Credit Cards in the format of "dddd dddd dddd dddd" or "dddd-dddd-dddd-dddd" or "dddddddddddddddd"
-Phone Numbers in the format of a +, country code, then three groups with spaces or dashes, brackets allowed on the first group.
-URLs in the format of "https/pattern/......

## ALU email validation

The three domains for alu that are validated are
alueducation.com
alumni.alueducation.com
si.alueducation.com

each pattern is anchored with ^ and $ so the whole address must match, and the dots are escaped so alueducationXcom can't sneak through

## Security considerations

Card masking was used so as not to output the card data that is sensitive. Hostile detecting was used to capture attacks and the ones found were  "<script>alert('pwned')</script>", "'; DROP ". '|| []' is there because text.match() returns null if a match is not found and then .filter/.map on null crashes the program.

## Known limitations.

Emails are not checked for existence, the hostile pattern only catches two attack styles, card numbers aren't checked with a checksum, phones outside the +CC format are missed.







