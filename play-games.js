const axios = require('axios');
const fs = require('fs');

// Step 1: Fetch starting cookies
async function openFirstPage(id){
  try {
    const response = await axios.get(id, {
        withCredentials: true
    });

    const cookies = response.headers['set-cookie'];
    const arrAffinityCookie = cookies.find(cookie => cookie.startsWith('ARRAffinity'));
    const arrAffinitySameSiteCookie = cookies.find(cookie => cookie.startsWith('ARRAffinitySameSite'));
    const ASPNET_SessionId = cookies.find(cookie => cookie.startsWith('ASP.NET_SessionId'));
    const participant = cookies.find(cookie => cookie.startsWith('participant'));

    return [arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant];
  } catch (error) {
      console.error('Error fetching cookies:', error);
  }
}

// Step 2: Start the game
async function start(arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant) {
  const response = await axios.get('https://spel.normal.se/slotmachine/Start', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `${arrAffinityCookie}; ${arrAffinitySameSiteCookie}; ${ASPNET_SessionId}; ${participant}`,
    },
    withCredentials: true
  });
}

// Step 3: Fetch the game cookies
async function startGame(arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant) {
  const response = await axios.get('https://spel.normal.se/slotmachine/Game', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `${arrAffinityCookie}; ${arrAffinitySameSiteCookie}; ${ASPNET_SessionId}; ${participant}`,
    },
    withCredentials: true
  });
  const cookies = response.headers['set-cookie'];
  if (!cookies) return null;
  const game = cookies.find(cookie => cookie.startsWith('game'));
  return game;
}

// Step 4: End the game and extract the prize message
async function gameEnd(arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant, game) {
  const response = await axios.get('https://spel.normal.se/slotmachine/GameEnd', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `${arrAffinityCookie}; ${arrAffinitySameSiteCookie}; ${ASPNET_SessionId}; ${participant}; ${game}`,
    },
    withCredentials: true
  });

  const cookies = response.headers['set-cookie'];
  const general_event = cookies.find(cookie => cookie.startsWith('general_event'));

  // Extract the prize using regex
  const prizeMatch = response.data.match(/<p>(Du har vunnit[^<]+)<\/p>/);

  // Log the prize or "You lost" if no prize is found
  if (prizeMatch && prizeMatch[1]) {
    console.log('Prize:', prizeMatch[1]);
  } else {
    console.log('You lost');
  }

  // write the response data to a file
  // fs.writeFile('./index.html', response.data, (err) => {
  //   if (err) {
  //       console.error('Error writing file:', err);
  //   }
  // });

  return general_event;
}

// Step 5: Play the game
async function playGame(id) {
  const cookies = await openFirstPage(id);
  const [arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant] = cookies;

  await start(arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant);

  const game = await startGame(arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant);
  if (!game){
    console.log("Game is null, Skipping!", id); return;
  }
  const general_event = await gameEnd(arrAffinityCookie, arrAffinitySameSiteCookie, ASPNET_SessionId, participant, game);
}

const ids = [
  //Put the links from the other code here
  'ex4mp1e','1d4ex4mp1e'
]
console.log(ids)

async function loopPlayGames(){
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    await playGame("https://spel.normal.se/slotmachine/Confirmation/?s="+id)
  }
}
loopPlayGames()
