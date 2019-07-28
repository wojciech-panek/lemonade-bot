const express = require('express');
const cors = require('cors');
const { WebClient } = require('@slack/web-api');

const tokens = [
  'xoxp-2612359521-51100563574-650242558917-9b2c8fc9d19ecafac7098175ca2c8071',
  'xoxp-2612359521-49396721797-638850536563-94822bd72b054c48356a11ce77d0f686'
];
// const channelId = 'GCN1Z9N91';
const channelId = 'GLU8VEG7P';

const deleteMessage = async (message, client, user) => {
  try {
    if (message.replies && message.replies.length) {
      await Promise.all(message.replies.map((message) => deleteMessage(message, client, user)))
    }

    if (message.user === user.user_id) {
      await client.chat.delete({ channel: channelId, ts: message.ts, as_user: true });
    }
    return Promise.resolve();
  } catch (e) {
    // if something goes wrong - silent fail
    return Promise.resolve();
  }
};

const getMessages = async (client) => {
  let messages = [];
  let hasMore = true;
  let cursor = null;

  while (hasMore) {
    try {
      const response = await client.conversations.history({ limit: 5, channel: channelId, cursor });

      messages = messages.concat(response.messages);
      hasMore = response.has_more;
      cursor = response.response_metadata.next_cursor;
    } catch (e) {
      break;
    }
  }

  return Promise.resolve(messages);
};

const clearHistory = async (req, res) => {
  await Promise.all(tokens.map(async token => {
    const client = new WebClient(token);
    const user = await client.auth.test();

    const messages = await getMessages(client);

    return Promise.all(messages.map((message) => deleteMessage(message, client, user)));
  }));

  res.send({ status: 'ok' });
};

const app = express();

app.use(cors({ origin: true }));
app.post('/', clearHistory);

const port = process.env.PORT || 3000;

app.listen(port);
