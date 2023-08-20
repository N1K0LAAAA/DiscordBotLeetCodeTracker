const { Client, GatewayIntentBits } = require('discord.js');
const https = require('https');
const auth = require('./auth.json');
const prefix = '!';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let fetchEnabled = false; // Flag to control the fetching

client.on("ready", () => {
    console.log("Bot is online!");
    client.user.setActivity('Gaming');
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "on":
            if (!fetchEnabled) {
                fetchEnabled = true;
                message.channel.send("Fetching has been turned on.");
                fetch_demo(message);
            } else {
                message.channel.send("Fetching is already on.");
            }
            break;

        case "off":
            if (fetchEnabled) {
                fetchEnabled = false;
                message.channel.send("Fetching has been turned off.");
            } else {
                message.channel.send("Fetching is already off.");
            }
            break;
    }
});

async function fetch_demo(message) {
    if (!fetchEnabled) {
        return; // Stop fetching if it's turned off
    }

    const options = {
        hostname: 'leetcode-stats-api.herokuapp.com',
        path: '/N1K0LAAAA',
        method: 'GET'
    };

    const req = https.request(options, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            if (resp.statusCode === 200) {
                const jsonData = JSON.parse(data);

                const rankValue = jsonData.ranking;
                const easySolved = jsonData.easySolved;
                const mediumSolved = jsonData.mediumSolved;
                const hardSolved = jsonData.hardSolved;
                const totalSolved = jsonData.totalSolved;

                const messageContent = `Rank: ${rankValue}\nEasy Solved: ${easySolved}\nMedium Solved: ${mediumSolved}\nHard Solved: ${hardSolved}\nTotal Solved: ${totalSolved}`;

                message.channel.send(messageContent);

                // Call setTimeout here to repeat the fetch_demo after 2 minutes
                setTimeout(() => fetch_demo(message), 2 * 60 * 1000);
            } else {
                console.log("Request failed with status code:", resp.statusCode);
            }
        });
    });

    req.on('error', (error) => {
        console.error("Error fetching data:", error);
    });

    req.end();
}

client.login(auth.token);
