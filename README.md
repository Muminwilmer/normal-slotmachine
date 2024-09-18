1. Replace the email in the create accounts to your email
2. Run it

3. Go to your email and open "conversation" full of verification emails
4. Run the grab-all-emailVerification-links.js and copy the logs
4.5 (test)[javascript:(function(){alert("%27"+Array.from(document.documentElement.outerHTML.matchAll(/\/Confirmation\/\?s=(\S+)"/g)).map(m=>m[1]).join("%27, %27")+"%27")})();]

5. Put the verification links from before in the list at the bottom of play-games.js
6. run
7. the winnings should be sent to your email.
