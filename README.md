# VidCord

A Discord bot that provides extra information on video links

## Installation

1. Clone this repository, install the dependencies and build the bot:

   ```sh
   git clone https://github.com/SBence/vidcord.git
   cd vidcord
   yarn install
   yarn run build
   ```

2. Add your bot token to the `.env` file in the project directory:

   ```properties
   TOKEN=<insert your Discord bot token here>
   ```

   _For more information on creating a bot application, [see here](https://discord.com/developers/docs/getting-started#creating-an-app)._

3. Run `build/index.js` using your preferred method. (For example, to run with Node.js: `node build/index.js`)

## Bot usage

### Invite the bot to your server

For more information on how to do so, [see here](https://discord.com/developers/docs/getting-started#adding-scopes-and-permissions).

> [!IMPORTANT]
> On the _OAuth2_ page, make sure to check **bot** under _Scopes_ and check **View Channels**, **Send Messages** and **Embed Links** under _Bot Permissions_. Additionally, on the **Bot** page, make sure that **Message Content Intent** is enabled under _Privileged Gateway Intents_.

The bot will automatically respond with video information when supported links are sent.

## Bot configuration

To prevent the bot from sending messages in certain channels, simply use Discord's permission system to disable the **View Channel** permission for the bot in such channels.
