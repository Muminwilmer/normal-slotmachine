const axios = require('axios');
const fs = require('fs');

async function getFirstCookies() {
    try {
        const response = await axios.get('https://spel.normal.se/slotmachine/Index', {
            withCredentials: true
        });

        // Get the cookies from the response
        const cookies = response.headers['set-cookie'];

        const arrAffinityCookie = cookies.find(cookie => cookie.startsWith('ARRAffinity'));
        const arrAffinitySameSiteCookie = cookies.find(cookie => cookie.startsWith('ARRAffinitySameSite'));

        return [arrAffinityCookie, arrAffinitySameSiteCookie];
    } catch (error) {
        console.error('Error fetching cookies:', error);
    }
}

async function createAccount(arrAffinityCookie, arrAffinitySameSiteCookie, email, count) {
    try {
        const response = await axios.post('https://spel.normal.se/slotmachine/Index', new URLSearchParams({
            PreConfirm: '',
            recaptcha3: '',
            Es: '',
            Source: '',
            email: `${email}+${count}@gmail.com`,
            LatestUtmSource: '',
            TempBirthday: '2000-12-24',
            terms: 'true',
            Newsletter: 'true',
            AgeVerification: 'on'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `${arrAffinityCookie}; ${arrAffinitySameSiteCookie}`, // Include the cookies + empty 'game' cookie
            },
            withCredentials: true
        });
        console.log(response.headers)
        fs.writeFile('./index.html', response.data, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }
        });
    } catch (error) {
        console.error('Error creating account:', error);
    }
}

async function makeAccount(email, count) {
    const cookies = await getFirstCookies();
    console.log(`Creating account for ${email}+${count}@gmail.com`);
    if (cookies) {
        const [arrAffinityCookie, arrAffinitySameSiteCookie] = cookies;
        console.log(cookies)
        await createAccount(arrAffinityCookie, arrAffinitySameSiteCookie, email, count);
        console.log("Done!")
    }
}

async function loopMakeAccounts(amount){
    for (let i = 1; i < amount+1; i++) {
        // Add first part of your email here (EXAMPLE+ix****@gmail.com)
        makeAccount("EXAMPLE",`${i}x${Math.floor(Math.random()*10000)}`);
        console.log(`Made ${i} account(s)!`)
        // await new Promise((resolve) => setTimeout(resolve, 10000));
    }
}
// Amount of accounts created (will probably block your ip after a while btw)
loopMakeAccounts(20)
