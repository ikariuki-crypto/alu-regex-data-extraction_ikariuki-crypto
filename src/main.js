const fs = require("fs");

const text = fs.readFileSync("input/raw-text.txt", "utf8");

//This matches every text following the email format while applying: example@gmail.com,
//It  rejects the double @@ signs.
//grace.w123@.com fails because the domain needs characters before the dot.
//text.match() returns null if a match is not found and then .filter/.map on null crashes the program.
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const emails = text.match(emailPattern) || []
const aluOfficial = /^[a-zA-Z0-9._%+-]+@alueducation\.com$/;
const alualumni = /^[a-zA-Z0-9._%+-]+@alumni\.alueducation\.com$/;
const alusi = /^[a-zA-Z0-9._%+-]+@si\.alueducation\.com$/;

//This filters the emails that match the ALU emailing pattern.
//Any email that does not match is not returned.
//Each pattern is anchored with ^ and $ so the whole address must match, and the dots are escaped so alueducationXcom can't sneak through
const officialEmails = emails.filter(e => aluOfficial.test(e));
const alumniEmails = emails.filter(e => alualumni.test(e));
const siEmails = emails.filter(e => alusi.test(e));


//This pattern matches card patterns that are in groups of four, have hyphens in between the values or have no spaces
//Card numbers with underscores or odd format than the one in the patterns are not returned because they do not match
const cardPattern = /\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}/g
const cards = text.match(cardPattern) || []

//This function masks all the card digits except the last four.
//Raw numbers cant be output because sensitive data like card numbers shouldn't be exposed in output.
function maskCard(card) {
    const digits = card.replace(/\D/g, "");
    return "**** **** **** " + digits.slice(-4);
}
const maskedCards = cards.map(maskCard);


//Accepts phone numbers that match the outlined pattern.
//Phone Numbers in the format of a +, country code, then three groups with spaces or dashes, brackets allowed on the first group are accepted and those in another format are rejected.
const phonesPattern = /\+\d{1,3}[ -]?\(?\d{2,3}\)?[ -]?\d{3}[ -]?\d{3,4}/g;
const phones = text.match(phonesPattern) || []

//Accepts and returns all URLs matching the given pattern.
//Only http:// and https:// are accepted
const URLPattern = /https?:\/\/[^\s"'<>]+/g;
const rawURLs = text.match(URLPattern) || []
const urls = rawURLs.map(u => u.replace(/[.,]$/, ""))


//This spots the attacks and flags them.
//Left catches <script>...</script> blocks; right catches a quote, semicolon and a dangerous SQL keyword, case-insensitive because of the i flag.
const hostilePattern = /<script[\s\S]*?<\/script>|(['"]\s*;\s*(DROP|DELETE|INSERT|UPDATE)\s)/gi;
const hostile = text.match(hostilePattern) || []


const results = {
  emails: {
    all: emails,
    aluOfficial: officialEmails,
    aluAlumni: alumniEmails,
    aluSi: siEmails
  },
  creditCards: maskedCards,
  phoneNumbers: phones,
  urls: urls,
  hostileInputDetected: hostile
};

fs.writeFileSync("output/sample-output.json", JSON.stringify(results, null, 2));
console.log("Done. Results written to output/sample-output.json");

