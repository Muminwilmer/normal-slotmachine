const htmlContent = document.documentElement.outerHTML;const regex = /klicka på <a href="(https:\/\/spel\.normal\.se\/slotmachine\/Confirmation\/\?s=\S+)"/g;

// Use matchAll to find all matches, and then map them to extract the URL part (group 1)
const matches = Array.from(htmlContent.matchAll(regex)).map(match => match[1]);

// Log all the matched URLs as a comma-separated string
console.log("'"+matches.join("', '")+"'");

//just open the email page with all the buttons and run the code and it will log all of the links like this
//[ 
// 'https://spel.normal.se/slotmachine/Confirmation/?s=7ulTC0Gtp', 
// 'https://spel.normal.se/slotmachine/Confirmation/?s=Nup2DRwG2', 
// 'https://spel.normal.se/slotmachine/Confirmation/?s=jlTSWRCIN' 
//]
