const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/web-api');

// const channelId = 'GLU8VEG7P';
const channelId = 'GCN1Z9N91';
const password = 'Lemonade321';

const deleteMessage = async (message, client, user) => {
  try {
    if (message.replies && message.replies.length) {
      await Promise.all(
        message.replies.map(message => deleteMessage(message, client, user))
      );
    }

    if (message.user === user.user_id) {
      await client.chat.delete({
        channel: channelId,
        ts: message.ts,
        as_user: true,
      });
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (e) {
    // if something goes wrong - silent fail
    return Promise.resolve(false);
  }
};

const getMessages = async client => {
  let messages = [];
  let hasMore = true;
  let cursor = null;

  while (hasMore) {
    try {
      const response = await client.conversations.history({
        limit: 5,
        channel: channelId,
        cursor,
      });

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
  if (req.body.password !== password) {
    return res.status(401).send({ status: 'error' });
  }

  try {
    const deletedCounts = await Promise.all(
      process.env.TOKENS.split(',').map(async token => {
        const client = new WebClient(token);
        const user = await client.auth.test();

        const messages = await getMessages(client);

        const deletedMessages = await Promise.all(
          messages.map(message => deleteMessage(message, client, user))
        );
        return Promise.resolve(deletedMessages.filter(value => value).length);
      })
    );

    const deletedSum = deletedCounts.reduce(
      (prev, current) => prev + current,
      0
    );

    return res.send({ status: 'ok', deleted: deletedSum });
  } catch (e) {
    return res.status(500).send({ status: 'error' });
  }
};

const app = express();
const router = express.Router();

router.post('/clear-history', clearHistory);

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/', express.static('webapp/build'));

const port = process.env.PORT || 3000;

app.listen(port);
