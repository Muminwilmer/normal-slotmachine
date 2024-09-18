# Automated Account Creation and Email Verification Guide

## 1. Replace the Email in the Account Creation Script

First, replace the placeholder email in the create-account.js file with your email address. This is the email you want the verification codes to be sent to + your winnings later

# Bookmarklet to Extract Email Verification Links

You can use this bookmarklet to quickly grab all the verification links from your email.
javascript:(function(){alert("'"+Array.from(document.documentElement.outerHTML.matchAll(/\/Confirmation\/\?s=(\S+)"/g)).map(m=>m[1]).join("', '")+"'")})();

### How to use:
1. Drag the code below to your bookmarks bar.
2. Open the email that contains the verification links.
3. Click the bookmark, and a prompt will appear with all the extracted links, ready to be copied.

## Play games automatically:
Once you have the verification links, you'll need to place them in the script that automates the games.

Open the play-games.js script.
At the bottom of the file, there will be a section where you can input the verification links you copied from the email.
Example:
let ids = [
  'link1',
  'link2',
  'link3'
];
