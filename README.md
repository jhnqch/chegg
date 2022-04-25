# Chegg Discord Helper
Scrapes homework answers from chegg links sent from users via Discord.
# How to Use
**NOTE: Must have Chegg Premium!**
1. Download/clone the project.
2. Access project folder through the terminal.
3. Run `npm install`
4. Create a `config.json` file in the root folder.
5. Add the following to the `config.json` file
``` 
{
    "email": "EMAIL",
    "password": "PASSWORD",
    "userAgent": "YOUR USER AGENT",
    "path": "YOUR CHROME PATH",
    "token": "YOUR DISCORD BOT TOKEN"
}
```
6. In the terminal, type node index.js
7. Now the discord bot is up and running!
8. In your specified channel type the command `!chegg <your-link>`
9. Then the bot should DM the account a html file of the answer!
