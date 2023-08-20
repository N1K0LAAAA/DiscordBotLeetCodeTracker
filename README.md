# DiscordBotLeetCodeTracker

First of all go to src -> auth.json and replace your token with your discord bot token.
You can find your discord bot Token at `https://discordapp.com/developers/applications/`.
```
{
    "token" : "your token"
} 
```
After you have done that go to src -> index.js and find const options.
And change the path to your LeetCode username. 
```

    const options = {
        hostname: 'leetcode-stats-api.herokuapp.com',
        path: '/N1K0LAAAA',
        method: 'GET'
    };


```
You can also edit what kind of data the bot should send you by  visiting the makers of the API `https://github.com/JeremyTsaii/leetcode-stats-api`
