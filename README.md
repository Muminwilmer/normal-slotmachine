1. Replace the email in the create accounts to your email<br>
2. Run it<br>
<br>
3. Go to your email and open "conversation" full of verification emails<br>
4. Run the grab-all-emailVerification-links.js and copy the logs<br>
4.5 You could also drag this thing into the bookmarks bar and press it while on the email to grab all links :P <br>
javascript:(function(){alert("'"+Array.from(document.documentElement.outerHTML.matchAll(/\/Confirmation\/\?s=(\S+)"/g)).map(m=>m[1]).join("', '")+"'")})();
<br>
6. Put the verification links from before in the list at the bottom of play-games.js<br>
7. run<br>
8. the winnings should be sent to your email.<br>
