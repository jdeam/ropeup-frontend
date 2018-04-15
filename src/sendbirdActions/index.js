import SendBird from 'sendbird';
import Promise from 'bluebird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const sbConnect = (userId, nickname, profileUrl) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('Could not connect to Sendbird.');
      } else {
        sb.updateCurrentUserInfo(nickname, profileUrl, (updatedUser, error) => {
          if (error) reject('Could not update user info.');
          else resolve(updatedUser);
        });
      }
    });
  });
};

export const sbDisconnect = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) sb.disconnect(() => {
      resolve(null);
    });
    else resolve(null);
  });
};

export const sbUpdateUser = (nickname, profileUrl) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) sb.updateCurrentUserInfo(nickname, profileUrl, (user, error) => {
      if (error) reject('Update user failed.');
      else resolve(user);
    });
  });
};

const sbCreateGroupChannelListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.GroupChannel.createMyGroupChannelListQuery();
};

export const sbFetchChannels = () => {
  const groupChannelListQuery = sbCreateGroupChannelListQuery();
  groupChannelListQuery.includeEmpty = true;
  return new Promise((resolve, reject) => {
    groupChannelListQuery.next((channels, error) => {
      if (error) reject('No channels found');
      else resolve(channels);
    });
  });
};

export const sbCreateChannel = (recipientId) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      sb.GroupChannel.createChannelWithUserIds([recipientId], true, null, null, null, null, (channel, error) => {
        if (error) reject('Could not create channel.');
        else resolve(channel);
      });
    }
  });
};

export const sbFetchPreviousMessages = (channel) => {
  return new Promise((resolve, reject) => {
    const messageListQuery = channel.createPreviousMessageListQuery();
    messageListQuery.load(100, false, (messageList, error) => {
      if (error) reject('Could not load messages.');
      else resolve(messageList);
    });
  });
};

export const sbSendTextMessage = (channel, textMessage) => {
  return new Promise((resolve, reject) => {
    channel.sendUserMessage(textMessage, (message, error) => {
      if (error) reject('Could not send message.');
      else resolve(message);
    });
  });
};
